from django.db import models
from django.utils.translation import gettext_lazy as _


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class Amenity(TimeStampedModel):
    name_uz = models.CharField(_("Name (Uzbek)"), max_length=255, blank=True, default="")
    name_ru = models.CharField(_("Name (Russian)"), max_length=255, blank=True, default="")
    name_en = models.CharField(_("Name (English)"), max_length=255, blank=True, default="")
    image = models.ImageField(_("Image"), upload_to="amenities/", blank=True, null=True)

    class Meta:
        verbose_name = _("Amenity")
        verbose_name_plural = _("Amenities")

    def __str__(self) -> str:
        return self.name_en or self.name_ru or self.name_uz or f"Amenity {self.pk}"


class Project(TimeStampedModel):
    class Status(models.TextChoices):
        UNDER_CONSTRUCTION = "under_construction", _("Under Construction")
        COMPLETED = "completed", _("Completed")
        FOR_SALE = "for_sale", _("For Sale")
        WILL_START = "will_start", _("Will Start")

    class Segment(models.TextChoices):
        PREMIUM = "premium", _("Premium")
        BUSINESS = "business", _("Business")
        COMFORT = "comfort", _("Comfort")

    title = models.CharField(_("Title"), max_length=255)
    slug = models.SlugField(_("Slug"), unique=True)
    status = models.CharField(
        _("Status"),
        max_length=32,
        choices=Status.choices,
        default=Status.UNDER_CONSTRUCTION
    )
    segment = models.CharField(
        _("Segment"),
        max_length=32,
        choices=Segment.choices,
        default=Segment.BUSINESS
    )
    location_name = models.CharField(_("Location Name"), max_length=255)
    number_of_houses = models.PositiveIntegerField(_("Number of Houses"), default=0)
    image = models.ImageField(_("Image"), upload_to="projects/images/")
    completion_date = models.DateField(_("Completion Date"))

    class Meta:
        verbose_name = _("Project")
        verbose_name_plural = _("Projects")

    def __str__(self) -> str:
        return self.title


class Apartment(TimeStampedModel):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="apartments",
        verbose_name=_("Project")
    )
    delivery_year = models.PositiveIntegerField(_("Delivery Year"))
    area = models.DecimalField(_("Area"), max_digits=10, decimal_places=2)
    rooms = models.PositiveIntegerField(_("Rooms"))
    floor = models.IntegerField(_("Floor"))
    number = models.CharField(_("Number"), max_length=64)
    image = models.ImageField(_("Image"), upload_to="apartments/")

    class Meta:
        verbose_name = _("Apartment")
        verbose_name_plural = _("Apartments")

    def __str__(self) -> str:
        return f"{self.project.title} #{self.number}"


class ProjectDetail(TimeStampedModel):
    project = models.OneToOneField(
        Project,
        on_delete=models.CASCADE,
        related_name="detail",
        verbose_name=_("Project")
    )

    # Header images (1 required, 4 optional)
    image1 = models.ImageField(_("Header Image 1"), upload_to="projects/details/header/")
    image2 = models.ImageField(_("Header Image 2"), upload_to="projects/details/header/", blank=True, null=True)
    image3 = models.ImageField(_("Header Image 3"), upload_to="projects/details/header/", blank=True, null=True)
    image4 = models.ImageField(_("Header Image 4"), upload_to="projects/details/header/", blank=True, null=True)
    image5 = models.ImageField(_("Header Image 5"), upload_to="projects/details/header/", blank=True, null=True)

    # About the Project
    about_description = models.TextField(_("About Description"))
    about_description_uz = models.TextField(_("About Description (Uzbek)"), blank=True, default="")
    about_description_ru = models.TextField(_("About Description (Russian)"), blank=True, default="")
    about_description_en = models.TextField(_("About Description (English)"), blank=True, default="")
    about_image = models.ImageField(_("About Image"), upload_to="projects/details/about/")

    # Location
    latitude = models.DecimalField(_("Latitude"), max_digits=9, decimal_places=6)
    longitude = models.DecimalField(_("Longitude"), max_digits=9, decimal_places=6)

    # Architecture
    architecture_description = models.TextField(_("Architecture Description"))
    architecture_description_uz = models.TextField(_("Architecture Description (Uzbek)"), blank=True, default="")
    architecture_description_ru = models.TextField(_("Architecture Description (Russian)"), blank=True, default="")
    architecture_description_en = models.TextField(_("Architecture Description (English)"), blank=True, default="")
    architecture_image1 = models.ImageField(_("Architecture Image 1"), upload_to="projects/details/architecture/")
    architecture_image2 = models.ImageField(_("Architecture Image 2"), upload_to="projects/details/architecture/")
    architecture_image3 = models.ImageField(_("Architecture Image 3"), upload_to="projects/details/architecture/")

    # Interior Space & Amenities
    interior_description = models.TextField(_("Interior Description"))
    interior_description_uz = models.TextField(_("Interior Description (Uzbek)"), blank=True, default="")
    interior_description_ru = models.TextField(_("Interior Description (Russian)"), blank=True, default="")
    interior_description_en = models.TextField(_("Interior Description (English)"), blank=True, default="")
    interior_image = models.ImageField(_("Interior Image"), upload_to="projects/details/interior/")

    # Premium Amenities
    amenities = models.ManyToManyField(Amenity, blank=True, verbose_name=_("Premium Amenities"))

    class Meta:
        verbose_name = _("Project Detail")
        verbose_name_plural = _("Project Details")

    def __str__(self) -> str:
        return f"Detail for {self.project.title}"
