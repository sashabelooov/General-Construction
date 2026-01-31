from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.content.models import Apartment


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class Lead(TimeStampedModel):
    class LeadType(models.TextChoices):
        CONSULTATION = "consultation", _("Consultation")
        CONTACT = "contact", _("Contact")

    class Status(models.TextChoices):
        NEW = "new", _("New")
        IN_PROGRESS = "in_progress", _("In Progress")
        DONE = "done", _("Done")

    type = models.CharField(_("Type"), max_length=16, choices=LeadType.choices, default=LeadType.CONSULTATION)
    name = models.CharField(_("Name"), max_length=255)
    phone = models.CharField(_("Phone"), max_length=64)
    apartment = models.ForeignKey(
        Apartment,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        verbose_name=_("Apartment")
    )
    source_page = models.CharField(_("Source Page"), max_length=255, blank=True, default="")
    status = models.CharField(_("Status"), max_length=16, choices=Status.choices, default=Status.NEW)
    note = models.TextField(_("Note"), blank=True, default="")

    class Meta:
        verbose_name = _("Lead")
        verbose_name_plural = _("Leads")

    def __str__(self) -> str:
        return f"{self.name} ({self.phone})"


class Conversation(TimeStampedModel):
    class Status(models.TextChoices):
        OPEN = "open", _("Open")
        CLOSED = "closed", _("Closed")

    lead = models.OneToOneField(
        Lead,
        on_delete=models.CASCADE,
        related_name="conversation",
        verbose_name=_("Lead")
    )
    status = models.CharField(_("Status"), max_length=16, choices=Status.choices, default=Status.OPEN)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="assigned_conversations",
        verbose_name=_("Assigned To")
    )
    customer_name = models.CharField(_("Customer Name"), max_length=255, blank=True, default="")
    customer_phone = models.CharField(_("Customer Phone"), max_length=64, blank=True, default="")

    class Meta:
        verbose_name = _("Conversation")
        verbose_name_plural = _("Conversations")

    def __str__(self) -> str:
        return f"Conversation #{self.pk} ({self.lead.name})"


class Message(TimeStampedModel):
    class SenderType(models.TextChoices):
        CUSTOMER = "customer", _("Customer")
        CONSULTANT = "consultant", _("Consultant")
        SYSTEM = "system", _("System")

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages",
        verbose_name=_("Conversation")
    )
    sender_type = models.CharField(_("Sender Type"), max_length=16, choices=SenderType.choices)
    sender_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="sent_messages",
        verbose_name=_("Sender User")
    )
    text = models.TextField(_("Text"))

    class Meta:
        ordering = ["created_at", "id"]
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")

    def __str__(self) -> str:
        return f"{self.sender_type}: {self.text[:40]}"
