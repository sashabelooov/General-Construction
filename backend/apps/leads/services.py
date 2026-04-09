import logging
import threading

import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def send_lead_to_uysot(phone: str, name: str = "", message: str = "", email: str = "", tag_list: list = None):
    """
    Send a new lead to the Uysot CRM dashboard.

    Args:
        phone:    Phone number (required) — must match Uysot format.
        name:     Customer name (optional).
        message:  Optional message/note.
        email:    Customer e-mail (optional).
        tag_list: List of string tags (optional).
    """
    base_url = getattr(settings, "UYSOT_BASE_URL", None)
    auth_token = getattr(settings, "UYSOT_AUTH_TOKEN", None)

    if not base_url or not auth_token:
        logger.warning("Uysot integration is not configured. Skipping lead submission.")
        return

    payload = {"phoneNumber": phone}
    if name:
        payload["name"] = name
    if message:
        payload["message"] = message
    if email:
        payload["email"] = email
    if tag_list:
        payload["tagList"] = tag_list

    headers = {
        "X-Auth": auth_token,
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(base_url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        logger.info("Lead successfully sent to Uysot. Phone: %s, Status: %s", phone, response.status_code)
    except requests.exceptions.Timeout:
        logger.error("Uysot request timed out for phone: %s", phone)
    except requests.exceptions.HTTPError as exc:
        logger.error("Uysot returned HTTP error for phone %s: %s — %s", phone, exc.response.status_code, exc.response.text)
    except requests.exceptions.RequestException as exc:
        logger.error("Uysot request failed for phone %s: %s", phone, exc)


def send_lead_to_uysot_async(phone: str, name: str = "", message: str = "", email: str = "", tag_list: list = None):
    """
    Non-blocking wrapper: sends the lead to Uysot in a background thread
    so the API response is not delayed.
    """
    thread = threading.Thread(
        target=send_lead_to_uysot,
        kwargs=dict(phone=phone, name=name, message=message, email=email, tag_list=tag_list),
        daemon=True,
    )
    thread.start()
