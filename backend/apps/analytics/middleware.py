from django.utils import timezone
from .models import Visitor, PageView, DailyStats


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

        # Get client IP address
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
                # Update visit count and last visit
                visitor.visit_count += 1
                visitor.last_visit = timezone.now()
                visitor.save(update_fields=['visit_count', 'last_visit'])

            # Create page view record for API requests
            if path.startswith('/api/'):
                PageView.objects.create(
                    visitor=visitor,
                    path=path,
                    referer=request.META.get('HTTP_REFERER', '')[:200] if request.META.get('HTTP_REFERER') else '',
                )

            # Update daily stats
            today = timezone.now().date()
            daily_stats, _ = DailyStats.objects.get_or_create(date=today)

            if created:
                daily_stats.unique_visitors += 1

            daily_stats.total_page_views += 1
            daily_stats.save(update_fields=['unique_visitors', 'total_page_views'])

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
