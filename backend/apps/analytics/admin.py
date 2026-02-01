from django.contrib import admin
from django.db.models import Count, Sum
from django.utils.html import format_html
from django.utils import timezone
from datetime import timedelta

from .models import Visitor, PageView, DailyStats


@admin.register(Visitor)
class VisitorAdmin(admin.ModelAdmin):
    list_display = ["ip_address", "visit_count", "country", "city", "first_visit", "last_visit"]
    list_filter = ["country", "first_visit", "last_visit"]
    search_fields = ["ip_address", "country", "city"]
    readonly_fields = ["ip_address", "user_agent", "first_visit", "last_visit", "visit_count", "country", "city"]
    ordering = ["-last_visit"]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        # Add statistics to the changelist view
        today = timezone.now().date()
        week_ago = today - timedelta(days=7)
        month_ago = today - timedelta(days=30)

        extra_context = extra_context or {}
        extra_context['total_visitors'] = Visitor.objects.count()
        extra_context['visitors_today'] = Visitor.objects.filter(
            last_visit__date=today
        ).count()
        extra_context['visitors_this_week'] = Visitor.objects.filter(
            last_visit__date__gte=week_ago
        ).count()
        extra_context['visitors_this_month'] = Visitor.objects.filter(
            last_visit__date__gte=month_ago
        ).count()
        extra_context['total_page_views'] = PageView.objects.count()

        return super().changelist_view(request, extra_context=extra_context)


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ["path", "visitor_ip", "timestamp"]
    list_filter = ["timestamp", "path"]
    search_fields = ["path", "visitor__ip_address"]
    readonly_fields = ["visitor", "path", "referer", "timestamp"]
    ordering = ["-timestamp"]

    def visitor_ip(self, obj):
        return obj.visitor.ip_address
    visitor_ip.short_description = "Visitor IP"

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(DailyStats)
class DailyStatsAdmin(admin.ModelAdmin):
    list_display = ["date", "unique_visitors", "total_page_views", "leads_count", "stats_bar"]
    list_filter = ["date"]
    ordering = ["-date"]
    readonly_fields = ["date", "unique_visitors", "total_page_views", "leads_count"]

    def stats_bar(self, obj):
        max_visitors = DailyStats.objects.order_by('-unique_visitors').first()
        max_value = max_visitors.unique_visitors if max_visitors else 1
        percentage = (obj.unique_visitors / max_value) * 100 if max_value > 0 else 0
        return format_html(
            '<div style="width:100px;background:#e0e0e0;border-radius:4px;">'
            '<div style="width:{}%;background:#4CAF50;height:20px;border-radius:4px;"></div>'
            '</div>',
            int(percentage)
        )
    stats_bar.short_description = "Relative Traffic"

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
