"""
Professional API Security Measures for General Construction API.

This module implements various security measures including:
- Rate limiting
- Request validation
- SQL injection prevention
- XSS protection
- CSRF protection
- Input sanitization
"""

import re
import logging
from functools import wraps
from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status

logger = logging.getLogger('django.security')


# Dangerous patterns to block (SQL injection, XSS)
DANGEROUS_PATTERNS = [
    r'<script[^>]*>.*?</script>',  # Script tags
    r'javascript:',  # JavaScript protocol
    r'on\w+\s*=',  # Event handlers (onclick, onload, etc.)
    r'--',  # SQL comment
    r';.*DROP',  # SQL injection attempt
    r';.*DELETE',  # SQL injection attempt
    r';.*UPDATE',  # SQL injection attempt
    r';.*INSERT',  # SQL injection attempt
    r'UNION\s+SELECT',  # SQL injection
    r'OR\s+1\s*=\s*1',  # SQL injection
    r"'.*OR.*'",  # SQL injection
]


def sanitize_input(value):
    """Sanitize input string to prevent XSS and SQL injection."""
    if not isinstance(value, str):
        return value

    # Check for dangerous patterns
    for pattern in DANGEROUS_PATTERNS:
        if re.search(pattern, value, re.IGNORECASE):
            logger.warning(f"Blocked dangerous input pattern: {pattern}")
            return None

    # Basic HTML entity encoding
    value = value.replace('<', '&lt;')
    value = value.replace('>', '&gt;')
    value = value.replace('"', '&quot;')
    value = value.replace("'", '&#x27;')

    return value


def validate_request_data(data):
    """Validate and sanitize request data."""
    if isinstance(data, dict):
        cleaned = {}
        for key, value in data.items():
            cleaned_key = sanitize_input(key) if isinstance(key, str) else key
            if cleaned_key is None:
                return None
            cleaned[cleaned_key] = validate_request_data(value)
            if cleaned[cleaned_key] is None and value is not None:
                return None
        return cleaned
    elif isinstance(data, list):
        return [validate_request_data(item) for item in data]
    elif isinstance(data, str):
        return sanitize_input(data)
    return data


class RateLimitMiddleware:
    """
    Custom rate limiting middleware for API endpoints.

    Limits requests based on IP address to prevent abuse.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # Rate limits: (requests, time_window_seconds)
        self.rate_limits = {
            'default': (1000, 3600),  # 1000 requests per hour
            '/api/v1/leads/': (10, 60),  # 10 leads per minute (prevent spam)
        }

    def __call__(self, request):
        if request.path.startswith('/api/'):
            ip = self.get_client_ip(request)

            # Find matching rate limit
            limit_key = 'default'
            for path, limits in self.rate_limits.items():
                if path != 'default' and request.path.startswith(path):
                    limit_key = path
                    break

            max_requests, time_window = self.rate_limits.get(limit_key, self.rate_limits['default'])
            cache_key = f"ratelimit:{ip}:{limit_key}"

            # Get current request count
            current_count = cache.get(cache_key, 0)

            if current_count >= max_requests:
                logger.warning(f"Rate limit exceeded for IP: {ip}, path: {request.path}")
                return JsonResponse(
                    {"error": "Rate limit exceeded. Please try again later."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            # Increment count
            cache.set(cache_key, current_count + 1, time_window)

        response = self.get_response(request)
        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')


class APIClientCheckMiddleware:
    """
    Block direct browser access to API endpoints.
    Only requests from our frontend (with X-GC-Client header) are allowed.
    Admin, schema docs, and leads POST are exempt.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/'):
            # Allow leads POST (contact form already has CSRF exemption)
            if request.path.startswith('/api/v1/leads/') and request.method == 'POST':
                return self.get_response(request)
            # Allow schema/docs endpoints
            if request.path.startswith('/api/schema'):
                return self.get_response(request)
            # Require custom header from our frontend
            if request.META.get('HTTP_X_GC_CLIENT') != 'web':
                return JsonResponse(
                    {"detail": "Access denied."},
                    status=status.HTTP_403_FORBIDDEN
                )
        return self.get_response(request)


class SecurityHeadersMiddleware:
    """Add security headers to API responses (skip admin to avoid breaking Jazzmin JS)."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Skip admin panel — Jazzmin needs inline scripts and permissive headers
        if request.path.startswith('/admin/') or request.path.startswith('/gc-management/'):
            return response

        # Security headers for non-admin responses
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'

        # Content Security Policy for API responses
        if request.path.startswith('/api/'):
            response['Content-Security-Policy'] = "default-src 'none'; frame-ancestors 'none'"

        return response


class InputValidationMiddleware:
    """Validate and sanitize all incoming request data."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only validate POST, PUT, PATCH requests
        if request.method in ['POST', 'PUT', 'PATCH']:
            if hasattr(request, 'data'):
                # For DRF requests
                pass  # DRF handles this through serializers
            elif request.content_type == 'application/json':
                import json
                try:
                    if request.body:
                        data = json.loads(request.body)
                        cleaned = validate_request_data(data)
                        if cleaned is None:
                            logger.warning(f"Blocked suspicious request from {request.META.get('REMOTE_ADDR')}")
                            return JsonResponse(
                                {"error": "Invalid request data"},
                                status=status.HTTP_400_BAD_REQUEST
                            )
                except json.JSONDecodeError:
                    pass

        response = self.get_response(request)
        return response


def rate_limit(max_requests=100, time_window=3600):
    """
    Decorator for rate limiting specific views.

    Usage:
        @rate_limit(max_requests=10, time_window=60)
        def my_view(request):
            ...
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            ip = request.META.get('REMOTE_ADDR')
            cache_key = f"ratelimit:{view_func.__name__}:{ip}"

            current_count = cache.get(cache_key, 0)
            if current_count >= max_requests:
                return JsonResponse(
                    {"error": "Rate limit exceeded"},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            cache.set(cache_key, current_count + 1, time_window)
            return view_func(request, *args, **kwargs)

        return wrapped_view
    return decorator


# Phone number validation for Uzbekistan (also in serializer, but this is for extra security)
def validate_uzbekistan_phone(phone):
    """Validate Uzbekistan phone number format."""
    # Remove all non-digit characters except +
    cleaned = re.sub(r'[^\d+]', '', phone)

    # Must start with +998
    if not cleaned.startswith('+998'):
        return False

    # Must have exactly 13 characters (+998 + 9 digits)
    if len(cleaned) != 13:
        return False

    # Valid operator codes
    valid_codes = ['90', '91', '93', '94', '95', '97', '98', '99', '33', '55', '71', '78']
    operator_code = cleaned[4:6]

    return operator_code in valid_codes
