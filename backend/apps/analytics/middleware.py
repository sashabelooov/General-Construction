import logging

from django.db.models import F
from django.utils import timezone
from .models import Visitor, PageView, DailyStats

logger = logging.getLogger(__name__)


class VisitorTrackingMiddleware:
    """Middleware to track visitors and page views."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip admin and static/media requests
        path = request.path
        if path.startswith('/admin/') or path.startswith('/static/') or path.startswith('/media/'):
            return self.get_response(request)

        # Skip API schema requests
        if path.startswith('/api/schema/'):
            return self.get_response(request)

        # Track visitor — wrapped in try/except so analytics never breaks real requests
        try:
            ip_address = self.get_client_ip(request)

            if ip_address:
                # Get or create visitor
                visitor, created = Visitor.objects.get_or_create(
                    ip_address=ip_address,
                    defaults={
                        'user_agent': request.META.get('HTTP_USER_AGENT', '')[:500],
                    }
                )

                if not created:
                    Visitor.objects.filter(pk=visitor.pk).update(
                        visit_count=F('visit_count') + 1,
                        last_visit=timezone.now(),
                    )

                # Create page view record for API requests
                if path.startswith('/api/'):
                    PageView.objects.create(
                        visitor=visitor,
                        path=path,
                        referer=request.META.get('HTTP_REFERER', '')[:200] if request.META.get('HTTP_REFERER') else '',
                    )

                # Update daily stats using F() to avoid race conditions
                today = timezone.now().date()
                daily_stats, day_created = DailyStats.objects.get_or_create(date=today)

                updates = {'total_page_views': F('total_page_views') + 1}
                if created:
                    updates['unique_visitors'] = F('unique_visitors') + 1

                DailyStats.objects.filter(pk=daily_stats.pk).update(**updates)
        except Exception:
            logger.exception("VisitorTrackingMiddleware error (non-fatal)")

        response = self.get_response(request)
        return response

    def get_client_ip(self, request):
        """Get the client's real IP address."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
