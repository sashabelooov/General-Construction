from rest_framework import serializers

from apps.content.models import Apartment, Project, ProjectDetail, Amenity
from apps.leads.models import Lead, Conversation
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
        if obj.image:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ApartmentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Apartment
        fields = [
            "id",
            "delivery_year",
            "area",
            "rooms",
            "floor",
            "number",
            "image_url",
        ]

    def get_image_url(self, obj: Apartment):
        if obj.image:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ProjectDetailSerializer(serializers.ModelSerializer):
    image1_url = serializers.SerializerMethodField()
    image2_url = serializers.SerializerMethodField()
    image3_url = serializers.SerializerMethodField()
    image4_url = serializers.SerializerMethodField()
    image5_url = serializers.SerializerMethodField()
    
    about_description = serializers.SerializerMethodField()
    about_image_url = serializers.SerializerMethodField()
    
    architecture_description = serializers.SerializerMethodField()
    architecture_image1_url = serializers.SerializerMethodField()
    architecture_image2_url = serializers.SerializerMethodField()
    architecture_image3_url = serializers.SerializerMethodField()
    
    interior_description = serializers.SerializerMethodField()
    interior_image_url = serializers.SerializerMethodField()
    
    amenities = AmenitySerializer(many=True, read_only=True)

    class Meta:
        model = ProjectDetail
        fields = [
            "image1_url", "image2_url", "image3_url", "image4_url", "image5_url",
            "about_description", "about_image_url",
            "latitude", "longitude",
            "architecture_description", "architecture_image1_url", "architecture_image2_url", "architecture_image3_url",
            "interior_description", "interior_image_url",
            "amenities",
        ]

    def _get_absolute_url(self, image_field):
        if image_field:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(image_field.url)
            return image_field.url
        return None

    def get_image1_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.image1)
    def get_image2_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.image2)
    def get_image3_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.image3)
    def get_image4_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.image4)
    def get_image5_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.image5)
    
    def get_about_image_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.about_image)
    def get_architecture_image1_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.architecture_image1)
    def get_architecture_image2_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.architecture_image2)
    def get_architecture_image3_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.architecture_image3)
    def get_interior_image_url(self, obj: ProjectDetail): return self._get_absolute_url(obj.interior_image)

    def get_about_description(self, obj: ProjectDetail):
        return {"uz": obj.about_description_uz, "ru": obj.about_description_ru, "en": obj.about_description_en}

    def get_architecture_description(self, obj: ProjectDetail):
        return {"uz": obj.architecture_description_uz, "ru": obj.architecture_description_ru, "en": obj.architecture_description_en}

    def get_interior_description(self, obj: ProjectDetail):
        return {"uz": obj.interior_description_uz, "ru": obj.interior_description_ru, "en": obj.interior_description_en}


class ProjectSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    detail = ProjectDetailSerializer(read_only=True)
    apartments = ApartmentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "status",
            "image_url",
            "completion_date",
            "location_name",
            "number_of_houses",
            "segment",
            "created_at",
            "detail",
            "apartments",
        ]

    def get_image_url(self, obj: Project):
        if obj.image:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class NewsPostSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    additional_information = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsPost
        fields = [
            "id",
            "image_url",
            "date_of_creation",
            "author_name",
            "title",
            "description",
            "additional_information",
            "link",
        ]

    def get_title(self, obj: NewsPost):
        return {"uz": obj.title_uz, "ru": obj.title_ru, "en": obj.title_en}

    def get_description(self, obj: NewsPost):
        return {"uz": obj.description_uz, "ru": obj.description_ru, "en": obj.description_en}

    def get_additional_information(self, obj: NewsPost):
        return {"uz": obj.additional_information_uz, "ru": obj.additional_information_ru, "en": obj.additional_information_en}

    def get_image_url(self, obj: NewsPost):
        if obj.image:
            request = self.context.get("request")
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class LeadCreateSerializer(serializers.ModelSerializer):
    conversation_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Lead
        fields = ["id", "type", "name", "phone", "source_page", "conversation_id"]

    def create(self, validated_data):
        lead = super().create(validated_data)
        convo = Conversation.objects.create(
            lead=lead,
            customer_name=lead.name,
            customer_phone=lead.phone,
        )
        lead.conversation_id = convo.id
        return lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ["id", "type", "name", "phone", "source_page", "status", "created_at"]
