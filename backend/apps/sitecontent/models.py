from django.db import models
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimeStampedModel):
    """
    A single-row model to manage site-wide content from Django Admin:
    - Contact page info
    - Footer/company info
    - Social links
    """

    company_name = models.CharField(_("Company Name"), max_length=255, blank=True, default="General Construction")
    phone_primary = models.CharField(_("Primary Phone"), max_length=64, blank=True, default="")
    phone_secondary = models.CharField(_("Secondary Phone"), max_length=64, blank=True, default="")
    email = models.EmailField(_("Email"), blank=True, default="")

    address_uz = models.TextField(_("Address (Uzbek)"), blank=True, default="")
    address_ru = models.TextField(_("Address (Russian)"), blank=True, default="")
    address_en = models.TextField(_("Address (English)"), blank=True, default="")

    office_hours_uz = models.TextField(_("Office Hours (Uzbek)"), blank=True, default="")
    office_hours_ru = models.TextField(_("Office Hours (Russian)"), blank=True, default="")
    office_hours_en = models.TextField(_("Office Hours (English)"), blank=True, default="")

    map_embed_url = models.TextField(_("Map Embed URL"), blank=True, default="")

    telegram_url = models.URLField(_("Telegram URL"), blank=True, default="")
    instagram_url = models.URLField(_("Instagram URL"), blank=True, default="")
    facebook_url = models.URLField(_("Facebook URL"), blank=True, default="")
    youtube_url = models.URLField(_("YouTube URL"), blank=True, default="")

    footer_text_uz = models.TextField(_("Footer Text (Uzbek)"), blank=True, default="")
    footer_text_ru = models.TextField(_("Footer Text (Russian)"), blank=True, default="")
    footer_text_en = models.TextField(_("Footer Text (English)"), blank=True, default="")

    def __str__(self) -> str:
        return "Site Settings"

    class Meta:
        verbose_name = _("Site Settings")
        verbose_name_plural = _("Site Settings")
