from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class NewsPost(TimeStampedModel):
    image = models.ImageField(upload_to="news/")
    date_of_creation = models.DateField(help_text="For showing in frontend")
    author_name = models.CharField(max_length=255)
    
    title = models.CharField(max_length=255)
    title_uz = models.CharField(max_length=255, blank=True, default="")
    title_ru = models.CharField(max_length=255, blank=True, default="")
    title_en = models.CharField(max_length=255, blank=True, default="")

    description = models.TextField()
    description_uz = models.TextField(blank=True, default="")
    description_ru = models.TextField(blank=True, default="")
    description_en = models.TextField(blank=True, default="")

    additional_information = models.TextField(blank=True, default="")
    additional_information_uz = models.TextField(blank=True, default="")
    additional_information_ru = models.TextField(blank=True, default="")
    additional_information_en = models.TextField(blank=True, default="")

    link = models.URLField(blank=True, default="")

    class Meta:
        verbose_name = "Yangilik"
        verbose_name_plural = "Yangiliklar"

    def __str__(self) -> str:
        return self.title
