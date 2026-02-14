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
    filterset_fields = ["segment"]
    search_fields = ["title", "location_name"]
    ordering_fields = ["completion_date", "created_at"]
    lookup_field = "slug"

    def get_object(self):
        """Support both slug and ID lookups."""
        lookup = self.kwargs.get(self.lookup_field)
        if lookup and lookup.isdigit():
            self.kwargs["pk"] = lookup
            self.lookup_field = "pk"
        return super().get_object()


class ApartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Apartment.objects.select_related("project").all()
    serializer_class = ApartmentSerializer
    filterset_fields = ["project", "rooms", "floor", "delivery_year"]
    search_fields = ["number", "project__title"]
    ordering_fields = ["area", "floor", "rooms", "created_at"]


class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsPost.objects.all()
    serializer_class = NewsPostSerializer
    search_fields = ["title_uz", "title_ru", "title_en", "author_name"]
    ordering_fields = ["date_of_creation", "created_at"]


class LeadViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Lead.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return LeadCreateSerializer
        return LeadSerializer
