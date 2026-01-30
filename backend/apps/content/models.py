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

    class Meta:
        verbose_name = "Qulaylik"
        verbose_name_plural = "Qulayliklar"

    def __str__(self) -> str:
        return self.name_en or self.name_ru or self.name_uz or f"Amenity {self.pk}"


class Project(TimeStampedModel):
    class Status(models.TextChoices):
        UNDER_CONSTRUCTION = "under_construction", "Under Construction"
        COMPLETED = "completed", "Completed"
        FOR_SALE = "for_sale", "For Sale"
        WILL_START = "will_start", "Will Start"

    class Segment(models.TextChoices):
        PREMIUM = "premium", "Premium"
        BUSINESS = "business", "Business"
        COMFORT = "comfort", "Comfort"

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    status = models.CharField(
        max_length=32, 
        choices=Status.choices, 
        default=Status.UNDER_CONSTRUCTION
    )
    segment = models.CharField(
        max_length=32, 
        choices=Segment.choices, 
        default=Segment.BUSINESS
    )
    location_name = models.CharField(max_length=255)
    number_of_houses = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="projects/images/")
    completion_date = models.DateField()

    class Meta:
        verbose_name = "Loyiha"
        verbose_name_plural = "Loyihalar"

    def __str__(self) -> str:
        return self.title


class Apartment(TimeStampedModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="apartments")
    delivery_year = models.PositiveIntegerField()
    area = models.DecimalField(max_digits=10, decimal_places=2)
    rooms = models.PositiveIntegerField()
    floor = models.IntegerField()
    number = models.CharField(max_length=64)
    image = models.ImageField(upload_to="apartments/")

    class Meta:
        verbose_name = "Xonadon"
        verbose_name_plural = "Xonadonlar"

    def __str__(self) -> str:
        return f"{self.project.title} #{self.number}"


class ProjectDetail(TimeStampedModel):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="detail")
    
    # Header images (1 required, 4 optional)
    image1 = models.ImageField(upload_to="projects/details/header/")
    image2 = models.ImageField(upload_to="projects/details/header/", blank=True, null=True)
    image3 = models.ImageField(upload_to="projects/details/header/", blank=True, null=True)
    image4 = models.ImageField(upload_to="projects/details/header/", blank=True, null=True)
    image5 = models.ImageField(upload_to="projects/details/header/", blank=True, null=True)

    # About the Project
    about_description = models.TextField()
    about_description_uz = models.TextField(blank=True, default="")
    about_description_ru = models.TextField(blank=True, default="")
    about_description_en = models.TextField(blank=True, default="")
    about_image = models.ImageField(upload_to="projects/details/about/")

    # Location
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    # Architecture
    architecture_description = models.TextField()
    architecture_description_uz = models.TextField(blank=True, default="")
    architecture_description_ru = models.TextField(blank=True, default="")
    architecture_description_en = models.TextField(blank=True, default="")
    architecture_image1 = models.ImageField(upload_to="projects/details/architecture/")
    architecture_image2 = models.ImageField(upload_to="projects/details/architecture/")
    architecture_image3 = models.ImageField(upload_to="projects/details/architecture/")

    # Interior Space & Amenities
    interior_description = models.TextField()
    interior_description_uz = models.TextField(blank=True, default="")
    interior_description_ru = models.TextField(blank=True, default="")
    interior_description_en = models.TextField(blank=True, default="")
    interior_image = models.ImageField(upload_to="projects/details/interior/")
    
    # Premium Amenities
    amenities = models.ManyToManyField(Amenity, blank=True, verbose_name="Premium Amenities")

    class Meta:
        verbose_name = "Loyiha tafsiloti"
        verbose_name_plural = "Loyiha tafsilotlari"

    def __str__(self) -> str:
        return f"Detail for {self.project.title}"
