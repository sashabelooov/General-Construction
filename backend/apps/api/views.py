from rest_framework import mixins, viewsets

from apps.content.models import Apartment, Project
from apps.news.models import NewsPost
from apps.leads.models import Lead
from apps.api.serializers import (
    ApartmentSerializer,
    LeadCreateSerializer,
    LeadSerializer,
    NewsPostSerializer,
    ProjectSerializer,
)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ["status", "project_class"]
    search_fields = ["name", "location"]
    ordering_fields = ["delivery_date", "created_at"]


class ApartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Apartment.objects.select_related("project").all()
    serializer_class = ApartmentSerializer
    filterset_fields = ["project", "rooms", "floor", "delivery_year", "is_available"]
    search_fields = ["number", "project__name"]
    ordering_fields = ["area_m2", "floor", "rooms", "created_at"]


class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsPost.objects.filter(is_published=True).all()
    serializer_class = NewsPostSerializer
    filterset_fields = ["category"]
    search_fields = ["title_uz", "title_ru", "title_en"]
    ordering_fields = ["published_at", "created_at"]


class LeadViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Lead.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return LeadCreateSerializer
        return LeadSerializer

