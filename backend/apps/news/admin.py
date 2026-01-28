from django.contrib import admin

from apps.news.models import NewsPost


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("id", "category", "is_published", "published_at", "title_en", "updated_at")
    list_filter = ("category", "is_published")
    search_fields = ("title_en", "title_ru", "title_uz", "author")

