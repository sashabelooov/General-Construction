from datetime import date

from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.news.models import NewsPost


@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ("title", "author_name", "date_of_creation", "created_at")
    list_display_links = ("title",)
    list_filter = ("date_of_creation", "author_name")
    search_fields = ("title", "author_name", "description")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (_("General Info"), {"fields": ("title", "title_ru", "title_en", "author_name", "date_of_creation")}),
        (_("Content"), {"fields": ("description", "description_ru", "description_en", "image")}),
        (_("Extra Info"), {"fields": ("additional_information", "additional_information_ru", "additional_information_en", "link")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )

    def get_changeform_initial_data(self, request):
        return {"date_of_creation": date.today()}
