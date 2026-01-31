from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.sitecontent.models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """
    Keep a single settings row.
    """

    fieldsets = (
        (_("Company Info"), {"fields": ("company_name", "phone_primary", "phone_secondary", "email")}),
        (_("Address"), {"fields": ("address_uz", "address_ru", "address_en")}),
        (_("Office Hours"), {"fields": ("office_hours_uz", "office_hours_ru", "office_hours_en")}),
        (_("Map"), {"fields": ("map_embed_url",)}),
        (_("Social Links"), {"fields": ("telegram_url", "instagram_url", "facebook_url", "youtube_url")}),
        (_("Footer"), {"fields": ("footer_text_uz", "footer_text_ru", "footer_text_en")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )
    readonly_fields = ("created_at", "updated_at")

    def has_add_permission(self, request):
        # allow only one row
        if SiteSettings.objects.exists():
            return False
        return super().has_add_permission(request)
