from django.contrib import admin

from apps.content.models import Amenity, Apartment, Project, ProjectImage


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


class ApartmentInline(admin.TabularInline):
    model = Apartment
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "status", "project_class", "location", "delivery_date", "updated_at")
    list_filter = ("status", "project_class")
    search_fields = ("name", "location", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProjectImageInline, ApartmentInline]


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "project", "number", "rooms", "area_m2", "floor", "delivery_year", "is_available")
    list_filter = ("project", "rooms", "delivery_year", "is_available")
    search_fields = ("number", "project__name")


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("id", "name_en", "name_ru", "name_uz")
    search_fields = ("name_en", "name_ru", "name_uz")


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ("id", "project", "kind", "sort_order")
    list_filter = ("kind",)
    search_fields = ("project__name",)

