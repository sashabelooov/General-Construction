from django.contrib import admin

from apps.sitecontent.models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """
    Keep a single settings row.
    """

    def has_add_permission(self, request):
        # allow only one row
        if SiteSettings.objects.exists():
            return False
        return super().has_add_permission(request)

