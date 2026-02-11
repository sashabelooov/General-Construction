from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class LeadsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.leads"
    verbose_name = _("Leads & Conversations")

