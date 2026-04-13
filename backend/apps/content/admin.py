from django.contrib import admin
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from apps.content.models import Amenity, Apartment, ArchitectureSection, InteriorSection, Project, ProjectDetail


class ArchitectureSectionInline(admin.StackedInline):
    model = ArchitectureSection
    extra = 1
    verbose_name = _("Architecture Section")
    verbose_name_plural = _("Architecture Sections")
    fields = ("title_uz", "title_ru", "title_en", "description_uz", "description_ru", "description_en", "image")


class InteriorSectionInline(admin.StackedInline):
    model = InteriorSection
    extra = 1
    verbose_name = _("Interior Section")
    verbose_name_plural = _("Interior Sections")
    fields = ("name_uz", "name_ru", "name_en", "description_uz", "description_ru", "description_en", "image")


class ProjectDetailInline(admin.StackedInline):
    model = ProjectDetail
    can_delete = False
    verbose_name_plural = _("Project Details")
    filter_horizontal = ("amenities",)

    fieldsets = (
        (_("1. Hero Images"), {
            "fields": ("image1", "image2", "image3", "image4", "image5"),
            "description": _("First image is required, other 4 are optional. These appear in the hero section and about carousel.")
        }),
        (_("2. About the Project"), {
            "fields": ("about_description_uz", "about_description_ru", "about_description_en", "about_image"),
            "description": _("Description and image for the 'About' section.")
        }),
        (_("3. YouTube Video"), {
            "fields": ("video_url",),
            "description": _("Paste a YouTube video URL (e.g. https://www.youtube.com/watch?v=abc123). The video will be embedded on the project page.")
        }),
        (_("4. Location"), {
            "fields": ("latitude", "longitude"),
            "description": _("GPS coordinates for the map. Find them on Google Maps.")
        }),
        (_("5. Amenities"), {
            "fields": ("amenities",),
            "description": _("Select amenities available in this project.")
        }),
        (_("6. Architecture & Interior Sections are added below (scroll down)"), {
            "fields": (),
            "description": _("Architecture and Interior sections are added as separate items below. Each section has a title, description and image.")
        }),
    )



class ApartmentInline(admin.TabularInline):
    model = Apartment
    extra = 1
    verbose_name = _("Apartment")
    verbose_name_plural = _("6. Apartments")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "segment", "location_name", "number_of_houses", "completion_date", "created_at")
    list_display_links = ("title",)
    list_filter = ("status", "segment", "completion_date")
    search_fields = ("title", "location_name", "slug")
    readonly_fields = ("created_at", "updated_at")
    inlines = [ProjectDetailInline, ArchitectureSectionInline, InteriorSectionInline, ApartmentInline]

    fieldsets = (
        (_("General Info"), {"fields": ("title", "status", "segment", "completion_date")}),
        (_("Location & Media"), {"fields": ("location_name", "location_name_ru", "location_name_en", "number_of_houses", "image")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )

    def save_model(self, request, obj, form, change):
        if not obj.slug:
            obj.slug = slugify(obj.title)
        super().save_model(request, obj, form, change)

    def get_inline_instances(self, request, obj=None):
        inlines = super().get_inline_instances(request, obj)
        if obj is None:
            return [i for i in inlines if not isinstance(i, (ArchitectureSectionInline, InteriorSectionInline))]
        return inlines


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("project", "number", "rooms", "area", "floor", "delivery_year")
    list_display_links = ("number",)
    list_filter = ("project", "rooms", "delivery_year")
    search_fields = ("number", "project__title")


