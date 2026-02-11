import os

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL", "gc-management").strip("/")

urlpatterns = [
    path(f"{ADMIN_URL}/", admin.site.urls),
    path("api/v1/", include("apps.api.urls")),
    path("i18n/", include("django.conf.urls.i18n")),  # Language switching
]

if settings.DEBUG:
    urlpatterns += [path("api/schema/", include("apps.api.schema_urls"))]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

