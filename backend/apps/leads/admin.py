from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.leads.models import Conversation, Lead, Message


class MessageInline(admin.TabularInline):
    model = Message
    extra = 1
    fields = ("sender_type", "sender_user", "text", "created_at")
    readonly_fields = ("created_at",)
    verbose_name = _("Message")
    verbose_name_plural = _("Messages")


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "name", "phone", "status", "created_at")
    list_filter = ("type", "status", "created_at")
    search_fields = ("name", "phone")

    fieldsets = (
        (None, {"fields": ("type", "name", "phone", "apartment")}),
        (_("Details"), {"fields": ("source_page", "status", "note")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )
    readonly_fields = ("created_at", "updated_at")


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("id", "status", "assigned_to", "customer_name", "customer_phone", "updated_at")
    list_filter = ("status", "updated_at")
    search_fields = ("customer_name", "customer_phone", "lead__name", "lead__phone")
    inlines = [MessageInline]

    fieldsets = (
        (None, {"fields": ("lead", "status", "assigned_to")}),
        (_("Customer Info"), {"fields": ("customer_name", "customer_phone")}),
        (_("Timestamps"), {"fields": ("created_at", "updated_at")}),
    )
    readonly_fields = ("created_at", "updated_at")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "conversation", "sender_type", "sender_user", "created_at")
    list_filter = ("sender_type", "created_at")
    search_fields = ("text", "conversation__lead__name", "conversation__lead__phone")
