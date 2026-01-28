from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.api import views

router = DefaultRouter()
router.register(r"projects", views.ProjectViewSet, basename="project")
router.register(r"apartments", views.ApartmentViewSet, basename="apartment")
router.register(r"news", views.NewsPostViewSet, basename="news")
router.register(r"leads", views.LeadViewSet, basename="lead")

urlpatterns = [
    path("", include(router.urls)),
]

