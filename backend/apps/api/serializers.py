from rest_framework import serializers

from apps.content.models import Apartment, Project, ProjectImage, Amenity
from apps.leads.models import Conversation, Lead, Message
from apps.news.models import NewsPost


class MultiLangSerializer(serializers.Serializer):
    uz = serializers.CharField(allow_blank=True, required=False)
    ru = serializers.CharField(allow_blank=True, required=False)
    en = serializers.CharField(allow_blank=True, required=False)


class AmenitySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Amenity
        fields = ["id", "name", "image_url"]

    def get_name(self, obj: Amenity):
        return {"uz": obj.name_uz, "ru": obj.name_ru, "en": obj.name_en}

    def get_image_url(self, obj: Amenity):
        return obj.image.url if obj.image else None


class ProjectImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ["id", "kind", "sort_order", "image_url"]

    def get_image_url(self, obj: ProjectImage):
        return obj.image.url if obj.image else None


class ApartmentSerializer(serializers.ModelSerializer):
    floor_plan_image_url = serializers.SerializerMethodField()
    project_id = serializers.IntegerField(source="project.id", read_only=True)
    project_name = serializers.CharField(source="project.name", read_only=True)

    class Meta:
        model = Apartment
        fields = [
            "id",
            "project_id",
            "project_name",
            "number",
            "area_m2",
            "rooms",
            "floor",
            "delivery_year",
            "is_available",
            "floor_plan_image_url",
        ]

    def get_floor_plan_image_url(self, obj: Apartment):
        return obj.floor_plan_image.url if obj.floor_plan_image else None


class ProjectSerializer(serializers.ModelSerializer):
    thumbnail_image_url = serializers.SerializerMethodField()
    hero_image_url = serializers.SerializerMethodField()
    about_image_url = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    full_description = serializers.SerializerMethodField()
    architecture_description = serializers.SerializerMethodField()
    interior_description = serializers.SerializerMethodField()
    images = ProjectImageSerializer(many=True, read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    apartments = ApartmentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "slug",
            "location",
            "status",
            "project_class",
            "delivery_date",
            "blocks",
            "total_area_m2",
            "floors",
            "map_lat",
            "map_lng",
            "map_embed_url",
            "thumbnail_image_url",
            "hero_image_url",
            "about_image_url",
            "short_description",
            "full_description",
            "architecture_description",
            "interior_description",
            "amenities",
            "images",
            "apartments",
        ]

    def get_thumbnail_image_url(self, obj: Project):
        return obj.thumbnail_image.url if obj.thumbnail_image else None

    def get_hero_image_url(self, obj: Project):
        return obj.hero_image.url if obj.hero_image else None

    def get_about_image_url(self, obj: Project):
        return obj.about_image.url if obj.about_image else None

    def get_short_description(self, obj: Project):
        return {"uz": obj.short_description_uz, "ru": obj.short_description_ru, "en": obj.short_description_en}

    def get_full_description(self, obj: Project):
        return {"uz": obj.full_description_uz, "ru": obj.full_description_ru, "en": obj.full_description_en}

    def get_architecture_description(self, obj: Project):
        return {"uz": obj.architecture_description_uz, "ru": obj.architecture_description_ru, "en": obj.architecture_description_en}

    def get_interior_description(self, obj: Project):
        return {"uz": obj.interior_description_uz, "ru": obj.interior_description_ru, "en": obj.interior_description_en}


class NewsPostSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsPost
        fields = [
            "id",
            "category",
            "author",
            "published_at",
            "title",
            "excerpt",
            "content",
            "image_url",
        ]

    def get_title(self, obj: NewsPost):
        return {"uz": obj.title_uz, "ru": obj.title_ru, "en": obj.title_en}

    def get_excerpt(self, obj: NewsPost):
        return {"uz": obj.excerpt_uz, "ru": obj.excerpt_ru, "en": obj.excerpt_en}

    def get_content(self, obj: NewsPost):
        return {"uz": obj.content_uz, "ru": obj.content_ru, "en": obj.content_en}

    def get_image_url(self, obj: NewsPost):
        return obj.image.url if obj.image else None


class LeadCreateSerializer(serializers.ModelSerializer):
    apartment_id = serializers.IntegerField(required=False, allow_null=True, write_only=True)
    conversation_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Lead
        fields = ["id", "type", "name", "phone", "apartment_id", "source_page", "conversation_id"]

    def create(self, validated_data):
        apartment_id = validated_data.pop("apartment_id", None)
        if apartment_id:
            validated_data["apartment_id"] = apartment_id
        lead = super().create(validated_data)
        convo = Conversation.objects.create(
            lead=lead,
            customer_name=lead.name,
            customer_phone=lead.phone,
        )
        lead.conversation_id = convo.id  # for response
        return lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "type", "name", "phone", "apartment_id", "source_page", "status", "created_at"]

