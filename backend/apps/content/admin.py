from django.contrib import admin
from apps.content.models import Amenity, Apartment, Project, ProjectDetail


class ProjectDetailInline(admin.StackedInline):
    model = ProjectDetail
    can_delete = False
    verbose_name_plural = "Loyiha tafsilotlari"
    
    fieldsets = (
        ("Header Images", {
            "fields": ("image1", "image2", "image3", "image4", "image5"),
            "description": "Birinchi rasm majburiy, qolgan 4tasi ixtiyoriy."
        }),
        ("About the Project", {
            "fields": ("about_description_uz", "about_description_ru", "about_description_en", "about_image")
        }),
        ("Location", {
            "fields": ("latitude", "longitude")
        }),
        ("Architecture", {
            "fields": ("architecture_description_uz", "architecture_description_ru", "architecture_description_en", 
                       "architecture_image1", "architecture_image2", "architecture_image3"),
            "description": "Arxitektura tavsifi va barcha 3ta rasm majburiy."
        }),
        ("Interior Space & Amenities", {
            "fields": ("interior_description_uz", "interior_description_ru", "interior_description_en", 
                       "interior_image", "amenities")
        }),
    )
    filter_horizontal = ("amenities",)


class ApartmentInline(admin.TabularInline):
    model = Apartment
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "segment", "location_name", "number_of_houses", "completion_date", "created_at")
    list_filter = ("status", "segment", "completion_date")
    search_fields = ("title", "location_name", "slug")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    inlines = [ProjectDetailInline, ApartmentInline]

    fieldsets = (
        (None, {"fields": ("title", "slug", "status", "segment", "completion_date")}),
        ("General Info", {"fields": ("location_name", "number_of_houses", "image")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ("id", "project", "number", "rooms", "area", "floor", "delivery_year")
    list_filter = ("project", "rooms", "delivery_year")
    search_fields = ("number", "project__title")


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("id", "name_en", "name_ru", "name_uz")
    search_fields = ("name_en", "name_ru", "name_uz")
