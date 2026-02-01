from django.db import models
from django.utils.translation import gettext_lazy as _


class Visitor(models.Model):
    """Track unique visitors by IP address."""
    ip_address = models.GenericIPAddressField(_("IP Address"))
    user_agent = models.TextField(_("User Agent"), blank=True, default="")
    first_visit = models.DateTimeField(_("First Visit"), auto_now_add=True)
    last_visit = models.DateTimeField(_("Last Visit"), auto_now=True)
    visit_count = models.PositiveIntegerField(_("Visit Count"), default=1)
    country = models.CharField(_("Country"), max_length=100, blank=True, default="")
    city = models.CharField(_("City"), max_length=100, blank=True, default="")

    class Meta:
        verbose_name = _("Visitor")
        verbose_name_plural = _("Visitors")
        ordering = ["-last_visit"]

    def __str__(self) -> str:
        return f"{self.ip_address} ({self.visit_count} visits)"


class PageView(models.Model):
    """Track page views."""
    visitor = models.ForeignKey(
        Visitor,
        on_delete=models.CASCADE,
        related_name="page_views",
        verbose_name=_("Visitor")
    )
    path = models.CharField(_("Page Path"), max_length=500)
    referer = models.URLField(_("Referer"), blank=True, default="")
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)

    class Meta:
        verbose_name = _("Page View")
        verbose_name_plural = _("Page Views")
        ordering = ["-timestamp"]

    def __str__(self) -> str:
        return f"{self.path} - {self.timestamp}"


class DailyStats(models.Model):
    """Daily aggregated statistics."""
    date = models.DateField(_("Date"), unique=True)
    unique_visitors = models.PositiveIntegerField(_("Unique Visitors"), default=0)
    total_page_views = models.PositiveIntegerField(_("Total Page Views"), default=0)
    leads_count = models.PositiveIntegerField(_("Leads Count"), default=0)

    class Meta:
        verbose_name = _("Daily Statistics")
        verbose_name_plural = _("Daily Statistics")
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"{self.date}: {self.unique_visitors} visitors, {self.total_page_views} views"
