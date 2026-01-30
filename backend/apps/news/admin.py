from django.contrib import admin
from apps.news.models import NewsPost


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "author_name", "date_of_creation", "created_at")
    list_filter = ("date_of_creation", "author_name")
    search_fields = ("title", "author_name", "description")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (None, {"fields": ("title", "title_uz", "title_ru", "title_en", "author_name", "date_of_creation")}),
        ("Content", {"fields": ("description", "description_uz", "description_ru", "description_en", "image")}),
        ("Extra Info", {"fields": ("additional_information", "additional_information_uz", "additional_information_ru", "additional_information_en", "link")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )
