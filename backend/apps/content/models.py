from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Amenity(TimeStampedModel):
    name_uz = models.CharField(max_length=255, blank=True, default="")
    name_ru = models.CharField(max_length=255, blank=True, default="")
    name_en = models.CharField(max_length=255, blank=True, default="")
    image = models.ImageField(upload_to="amenities/", blank=True, null=True)

    def __str__(self) -> str:
        return self.name_en or self.name_ru or self.name_uz or f"Amenity {self.pk}"


class Project(TimeStampedModel):
    class Status(models.TextChoices):
        UNDER_CONSTRUCTION = "under_construction", "Under Construction"
        FOR_SALE = "for_sale", "For Sale"
        COMPLETED = "completed", "Completed"

    class ProjectClass(models.TextChoices):
        COMFORT = "comfort", "Comfort"
        BUSINESS = "business", "Business"
        PREMIUM = "premium", "Premium"

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    location = models.CharField(max_length=255, blank=True, default="")
    status = models.CharField(max_length=32, choices=Status.choices, default=Status.FOR_SALE)
    project_class = models.CharField(max_length=32, choices=ProjectClass.choices, default=ProjectClass.BUSINESS)
    delivery_date = models.DateField(blank=True, null=True)

    blocks = models.PositiveIntegerField(default=0)
    total_area_m2 = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    floors = models.PositiveIntegerField(default=0)

    map_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    map_lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    map_embed_url = models.TextField(blank=True, default="")

    short_description_uz = models.TextField(blank=True, default="")
    short_description_ru = models.TextField(blank=True, default="")
    short_description_en = models.TextField(blank=True, default="")

    full_description_uz = models.TextField(blank=True, default="")
    full_description_ru = models.TextField(blank=True, default="")
    full_description_en = models.TextField(blank=True, default="")

    architecture_description_uz = models.TextField(blank=True, default="")
    architecture_description_ru = models.TextField(blank=True, default="")
    architecture_description_en = models.TextField(blank=True, default="")

    interior_description_uz = models.TextField(blank=True, default="")
    interior_description_ru = models.TextField(blank=True, default="")
    interior_description_en = models.TextField(blank=True, default="")

    thumbnail_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    hero_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    about_image = models.ImageField(upload_to="projects/", blank=True, null=True)

    amenities = models.ManyToManyField(Amenity, blank=True, related_name="projects")

    def __str__(self) -> str:
        return self.name


class ProjectImage(TimeStampedModel):
    class Kind(models.TextChoices):
        ARCHITECTURE = "architecture", "Architecture"
        GALLERY = "gallery", "Gallery"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="projects/gallery/")
    kind = models.CharField(max_length=32, choices=Kind.choices, default=Kind.GALLERY)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self) -> str:
        return f"{self.project.name} - {self.kind} ({self.sort_order})"


class Apartment(TimeStampedModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="apartments")
    number = models.CharField(max_length=64)
    area_m2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rooms = models.PositiveIntegerField(default=0)
    floor = models.IntegerField(default=0)
    delivery_year = models.PositiveIntegerField(default=2026)
    is_available = models.BooleanField(default=True)
    floor_plan_image = models.ImageField(upload_to="apartments/floor-plans/", blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.project.name} #{self.number}"

