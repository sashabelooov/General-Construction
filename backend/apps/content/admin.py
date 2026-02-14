from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.content.models import Amenity, Apartment, InteriorSection, Project, ProjectDetail


class InteriorSectionInline(admin.StackedInline):
    model = InteriorSection
    extra = 1
    verbose_name = _("Interior Section")
    verbose_name_plural = _("Interior Sections")
    fields = ("name_uz", "name_ru", "name_en", "description_uz", "description_ru", "description_en", "image", "order")


class ProjectDetailInline(admin.StackedInline):
    model = ProjectDetail
    can_delete = False
    verbose_name_plural = _("Project Details")

    fieldsets = (
        (_("1. Hero Images"), {
            "fields": ("image1", "image2", "image3", "image4", "image5"),
            "description": _("First image is required, other 4 are optional. These appear in the hero section and about carousel.")
        }),
        (_("2. About the Project"), {
            "fields": ("about_description_uz", "about_description_ru", "about_description_en", "about_image"),
            "description": _("Description and image for the 'About' section.")
        }),
        (_("3. Location"), {
            "fields": ("latitude", "longitude"),
            "description": _("GPS coordinates for the map. Find them on Google Maps.")
        }),
        (_("4. Architecture"), {
            "fields": ("architecture_description_uz", "architecture_description_ru", "architecture_description_en",
                       "architecture_image1", "architecture_image2", "architecture_image3"),
            "description": _("Architecture description and 3 images.")
        }),
        (_("5. Interior Sections are added below (scroll down)"), {
            "fields": (),
            "description": _("Interior sections with images are added as separate items below this form. Each section becomes a carousel slide.")
        }),
    )


class ApartmentInline(admin.TabularInline):
    model = Apartment
    extra = 1
    verbose_name = _("Apartment")
    verbose_name_plural = _("6. Apartments")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "segment", "location_name", "number_of_houses", "completion_date", "created_at")
    list_filter = ("status", "segment", "completion_date")
    search_fields = ("title", "location_name", "slug")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    inlines = [ProjectDetailInline, InteriorSectionInline, ApartmentInline]

    fieldsets = (
        (None, {"fields": ("title", "slug", "status", "segment", "completion_date")}),
        (_("General Info"), {"fields": ("location_name", "number_of_houses", "image")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )

    def get_inline_instances(self, request, obj=None):
        """Only show InteriorSectionInline when editing existing project with detail."""
        inlines = super().get_inline_instances(request, obj)
        if obj is None:
            # Remove InteriorSectionInline for new projects (no detail yet)
            return [i for i in inlines if not isinstance(i, InteriorSectionInline)]
        return inlines


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "project", "number", "rooms", "area", "floor", "delivery_year")
    list_filter = ("project", "rooms", "delivery_year")
    search_fields = ("number", "project__title")


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("id", "name_en", "name_ru", "name_uz")
    search_fields = ("name_en", "name_ru", "name_uz")
