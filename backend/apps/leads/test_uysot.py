"""
Tests for Uysot CRM integration
"""
from unittest.mock import patch, MagicMock
from django.test import TestCase, override_settings
from apps.leads.services import send_lead_to_uysot, send_lead_to_uysot_async


class UysotIntegrationTest(TestCase):
    """Test cases for Uysot CRM integration"""

    @override_settings(UYSOT_BASE_URL="https://service.app.uysot.uz/v1/external-source")
    @override_settings(UYSOT_AUTH_TOKEN="test-token")
    @patch("apps.leads.services.requests.post")
    def test_send_lead_to_uysot_success(self, mock_post):
        """Test successful lead submission to Uysot"""
        # Mock successful response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_post.return_value = mock_response

        send_lead_to_uysot(
            phone="+998901234567",
            name="John Doe",
            message="Test lead",
            email="john@example.com",
            tag_list=["new_lead", "website"]
        )

        # Verify the request was made
        mock_post.assert_called_once()
        call_args = mock_post.call_args

        # Check URL
        self.assertEqual(call_args[1]["url"] if "url" in call_args[1] else call_args[0][0],
                        "https://service.app.uysot.uz/v1/external-source")

        # Check headers
        self.assertEqual(call_args[1]["headers"]["X-Auth"], "test-token")
        self.assertEqual(call_args[1]["headers"]["Content-Type"], "application/json")

        # Check payload
        payload = call_args[1]["json"]
        self.assertEqual(payload["phoneNumber"], "+998901234567")
        self.assertEqual(payload["name"], "John Doe")
        self.assertEqual(payload["message"], "Test lead")
        self.assertEqual(payload["email"], "john@example.com")
        self.assertEqual(payload["tagList"], ["new_lead", "website"])

    @override_settings(UYSOT_BASE_URL="")
    @override_settings(UYSOT_AUTH_TOKEN="")
    @patch("apps.leads.services.logger")
    def test_send_lead_to_uysot_not_configured(self, mock_logger):
        """Test that function handles missing configuration gracefully"""
        send_lead_to_uysot(phone="+998901234567")
        
        # Should log warning and not make request
        mock_logger.warning.assert_called_once_with(
            "Uysot integration is not configured. Skipping lead submission."
        )

    @override_settings(UYSOT_BASE_URL="https://service.app.uysot.uz/v1/external-source")
    @override_settings(UYSOT_AUTH_TOKEN="test-token")
    @patch("apps.leads.services.requests.post")
    def test_send_lead_to_uysot_timeout(self, mock_post):
        """Test handling of request timeout"""
        import requests
        mock_post.side_effect = requests.exceptions.Timeout("Connection timed out")

        # Should not raise exception
        send_lead_to_uysot(phone="+998901234567")
        
        # Verify error was logged
        mock_post.assert_called_once()

    @override_settings(UYSOT_BASE_URL="https://service.app.uysot.uz/v1/external-source")
    @override_settings(UYSOT_AUTH_TOKEN="test-token")
    @patch("apps.leads.services.requests.post")
    def test_send_lead_to_uysot_http_error(self, mock_post):
        """Test handling of HTTP errors"""
        import requests
        mock_response = MagicMock()
        mock_response.status_code = 401
        mock_response.text = "Unauthorized"
        
        mock_exception = requests.exceptions.HTTPError(response=mock_response)
        mock_exception.response = mock_response
        mock_post.side_effect = mock_exception

        # Should not raise exception
        send_lead_to_uysot(phone="+998901234567")
        
        # Verify error was logged
        mock_post.assert_called_once()

    @override_settings(UYSOT_BASE_URL="https://service.app.uysot.uz/v1/external-source")
    @override_settings(UYSOT_AUTH_TOKEN="test-token")
    @patch("apps.leads.services.threading.Thread")
    def test_send_lead_to_uysot_async(self, mock_thread):
        """Test that async wrapper creates a thread"""
        mock_thread_instance = MagicMock()
        mock_thread.return_value = mock_thread_instance

        send_lead_to_uysot_async(
            phone="+998901234567",
            name="Jane Doe"
        )

        # Verify thread was created and started
        mock_thread.assert_called_once()
        mock_thread_instance.start.assert_called_once()

    @override_settings(UYSOT_BASE_URL="https://service.app.uysot.uz/v1/external-source")
    @override_settings(UYSOT_AUTH_TOKEN="test-token")
    @patch("apps.leads.services.requests.post")
    def test_send_lead_to_uysot_minimal_payload(self, mock_post):
        """Test sending lead with only required fields"""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_post.return_value = mock_response

        send_lead_to_uysot(phone="+998901234567")

        # Verify only phoneNumber is in payload
        payload = mock_post.call_args[1]["json"]
        self.assertEqual(payload, {"phoneNumber": "+998901234567"})
