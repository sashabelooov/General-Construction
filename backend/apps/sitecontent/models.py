from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SiteSettings(TimeStampedModel):
    """
    A single-row model to manage site-wide content from Django Admin:
    - Contact page info
    - Footer/company info
    - Social links
    """

    company_name = models.CharField(max_length=255, blank=True, default="General Construction")
    phone_primary = models.CharField(max_length=64, blank=True, default="")
    phone_secondary = models.CharField(max_length=64, blank=True, default="")
    email = models.EmailField(blank=True, default="")

    address_uz = models.TextField(blank=True, default="")
    address_ru = models.TextField(blank=True, default="")
    address_en = models.TextField(blank=True, default="")

    office_hours_uz = models.TextField(blank=True, default="")
    office_hours_ru = models.TextField(blank=True, default="")
    office_hours_en = models.TextField(blank=True, default="")

    map_embed_url = models.TextField(blank=True, default="")

    telegram_url = models.URLField(blank=True, default="")
    instagram_url = models.URLField(blank=True, default="")
    facebook_url = models.URLField(blank=True, default="")
    youtube_url = models.URLField(blank=True, default="")

    footer_text_uz = models.TextField(blank=True, default="")
    footer_text_ru = models.TextField(blank=True, default="")
    footer_text_en = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        return "Site Settings"

    class Meta:
        verbose_name = "Sayt sozlamalari"
        verbose_name_plural = "Sayt sozlamalari"

