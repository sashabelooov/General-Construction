from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class NewsPost(TimeStampedModel):
    class Category(models.TextChoices):
        NEWS = "news", "News"
        PROMO = "promo", "Promo"

    category = models.CharField(max_length=16, choices=Category.choices, default=Category.NEWS)
    author = models.CharField(max_length=255, blank=True, default="")
    published_at = models.DateTimeField(blank=True, null=True)
    is_published = models.BooleanField(default=True)
    image = models.ImageField(upload_to="news/", blank=True, null=True)

    title_uz = models.CharField(max_length=255, blank=True, default="")
    title_ru = models.CharField(max_length=255, blank=True, default="")
    title_en = models.CharField(max_length=255, blank=True, default="")

    excerpt_uz = models.TextField(blank=True, default="")
    excerpt_ru = models.TextField(blank=True, default="")
    excerpt_en = models.TextField(blank=True, default="")

    content_uz = models.TextField(blank=True, default="")
    content_ru = models.TextField(blank=True, default="")
    content_en = models.TextField(blank=True, default="")

    def __str__(self) -> str:
        return self.title_en or self.title_ru or self.title_uz or f"News {self.pk}"

