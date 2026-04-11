from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class NewsPost(TimeStampedModel):
    image = models.ImageField(_("Image"), upload_to="news/")
    date_of_creation = models.DateField(_("Date of Creation"), help_text=_("For showing in frontend"))
    author_name = models.CharField(_("Author Name"), max_length=255)
    slug = models.SlugField(_("Slug"), max_length=255, unique=True, blank=True)

    title = models.CharField(_("Title"), max_length=255)
    title_uz = models.CharField(_("Title (Uzbek)"), max_length=255, blank=True, default="")
    title_ru = models.CharField(_("Title (Russian)"), max_length=255, blank=True, default="")
    title_en = models.CharField(_("Title (English)"), max_length=255, blank=True, default="")

    description = models.TextField(_("Description"))
    description_uz = models.TextField(_("Description (Uzbek)"), blank=True, default="")
    description_ru = models.TextField(_("Description (Russian)"), blank=True, default="")
    description_en = models.TextField(_("Description (English)"), blank=True, default="")

    additional_information = models.TextField(_("Additional Information"), blank=True, default="")
    additional_information_uz = models.TextField(_("Additional Information (Uzbek)"), blank=True, default="")
    additional_information_ru = models.TextField(_("Additional Information (Russian)"), blank=True, default="")
    additional_information_en = models.TextField(_("Additional Information (English)"), blank=True, default="")

    link = models.URLField(_("Link"), blank=True, default="")

    class Meta:
        verbose_name = _("News Post")
        verbose_name_plural = _("News Posts")

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title, allow_unicode=True)
            slug = base_slug
            counter = 1
            while NewsPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
