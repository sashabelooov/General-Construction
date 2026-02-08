# Backend Plan (Django + DRF) — General Construction

This document proposes a Django backend to power the existing React/Vite frontend. The frontend currently uses mocked data (`src/lib/projectData.ts`) and pages/routes:

- `/projects`, `/projects/:id`
- `/news`, `/news/:id`
- `/contact` (+ consultation form used in multiple places)

The backend will provide **REST APIs**, **admin CRUD**, **media uploads**, and **multi-language content** (uz/ru/en) consistent with the current UI.

---

## Goals (Admin-first CMS)

- Replace frontend mock data with real APIs.
- **Everything comes from Django Admin** (no hardcoded frontend content):
  - Projects (all fields needed for `/projects/:id`)
  - Apartments (as nested project data + independent filters)
  - News (list + detail)
  - Site pages/static sections (About, Contact, footer/company info)
  - Consultation leads + a **conversation thread** between customer and consultant
- Support filtering + pagination required by UI.
- Store and serve images (local dev: Django media; production: S3-compatible).

---

## Tech Stack

- **Django** (core)
- **Django REST Framework (DRF)** (API)
- **PostgreSQL** (recommended; SQLite acceptable for quick dev)
- **django-filter** (query filtering)
- **drf-spectacular** (OpenAPI/Swagger docs)
- **Pillow** (image handling)
- **django-cors-headers** (if frontend is hosted on a different domain)
- Optional (later):
  - **SimpleJWT** for auth if you add customer accounts/favorites
  - **Celery + Redis** for async tasks (email, image processing)

---

## Project Structure (recommended)

```
backend/
  manage.py
  config/
    settings.py
    urls.py
    asgi.py
    wsgi.py
  apps/
    common/        # shared utilities, base models
    content/       # projects, amenities, apartments
    news/          # news posts
    leads/         # consultation/contact + conversations/messages
    site/          # admin-managed site pages/settings (About/Contact/etc.)
    users/         # staff/consultants (and optional customer accounts later)
```

---

## Data Model (Database Schema)

### Multi-language fields

Frontend supports `uz`, `ru`, `en`. Two practical approaches:

1. **Explicit fields per language** (simple, fast, clear in admin):
   - `title_uz`, `title_ru`, `title_en`
2. **JSON field** with `{uz, ru, en}` (cleaner API shape; admin needs custom widgets)

**Recommendation:** start with explicit fields per language for admin simplicity.

---

### `Project`

- `id` (UUID or int; int is fine to match current frontend `:id`)
- `name` (string)
- `slug` (unique string)
- `location` (string)
- `status` (enum: `UNDER_CONSTRUCTION`, `FOR_SALE`, `COMPLETED`)
- `class` (enum: `COMFORT`, `BUSINESS`, `PREMIUM`)
- `delivery_date` (date, nullable)
- `blocks` (int)
- `apartments_count` (int) *(or derived)*
- `total_area_m2` (int/decimal)
- `floors` (int)
- `map_lat` (decimal)
- `map_lng` (decimal)
- `map_embed_url` (text, optional)
- **i18n text**
  - `short_description_{uz,ru,en}` (text)
  - `full_description_{uz,ru,en}` (text)
  - `architecture_description_{uz,ru,en}` (text)
  - `interior_description_{uz,ru,en}` (text)
- **images**
  - `thumbnail_image` (ImageField)
  - `hero_image` (ImageField)
  - `about_image` (ImageField)
- timestamps: `created_at`, `updated_at`

### `ProjectImage` (gallery / architecture images)

- `id`
- `project` (FK Project, related `images`)
- `image` (ImageField)
- `kind` (enum: `ARCHITECTURE`, `GALLERY`, etc.)
- `sort_order` (int)

### `Amenity`

- `id`
- i18n: `name_{uz,ru,en}`
- `image` (ImageField)

### `ProjectAmenity` (optional through table)

- `project` (FK)
- `amenity` (FK)
- `sort_order`

### `Apartment`

- `id`
- `project` (FK)
- `number` (string)
- `area_m2` (decimal)
- `rooms` (int)
- `floor` (int)
- `delivery_year` (int)
- `is_available` (bool)
- `floor_plan_image` (ImageField)

### `NewsPost`

- `id`
- `category` (enum: `NEWS`, `PROMO`)
- `author` (string)
- `published_at` (datetime/date)
- `image` (ImageField)
- i18n:
  - `title_{uz,ru,en}`
  - `excerpt_{uz,ru,en}`
  - `content_{uz,ru,en}` (long text / rich text later)
- `is_published` (bool)

### `Lead` (Consultation / Contact submission)

- `id`
- `type` (enum: `CONSULTATION`, `CONTACT`)
- `name` (string)
- `phone` (string)
- `apartment` (FK Apartment, nullable)
- `source_page` (string, optional)
- `created_at`
- `status` (enum: `NEW`, `IN_PROGRESS`, `DONE`)
- `note` (text, optional; admin-only)

### `Conversation` (consultation chat/thread)

This enables “send form → consultant replies → messages visible to customer”.

- `id`
- `lead` (OneToOne to Lead)
- `customer_name` (string) *(or reuse Lead.name)*
- `customer_phone` (string) *(or reuse Lead.phone)*
- `status` (enum: `OPEN`, `CLOSED`)
- `assigned_to` (FK to Django `User`, nullable) *(consultant/staff)*
- `created_at`, `updated_at`

### `Message` (conversation messages)

- `id`
- `conversation` (FK Conversation)
- `sender_type` (enum: `CUSTOMER`, `CONSULTANT`, `SYSTEM`)
- `sender_user` (FK User, nullable) *(filled when consultant sends)*
- `text` (text)
- `created_at`

Notes:
- The frontend can show a simple chat UI once a conversation is created.
- If you want “OTP login by phone” later, you can add it without changing the message model much.

### Site-managed pages/settings (Admin CMS-lite)

To make “About page / Contact page / footer info” editable in admin:

#### Option A (simple): `SiteSettings` (single row)
- `company_name`
- `phones` (JSON or separate rows via `PhoneNumber` model)
- `email`
- `address_{uz,ru,en}`
- `office_hours_{uz,ru,en}`
- `map_embed_url`
- `social_links` (JSON: telegram/instagram/facebook/youtube)
- `footer_text_{uz,ru,en}`

#### Option B (flexible): `Page` + `PageSection`
- `Page`: `slug` (e.g. `about`, `contact`), i18n title, SEO fields
- `PageSection`: `page`, `type` (hero/text/faq), i18n content, images, ordering

Recommendation:
- Start with **Option A** (fast to ship).
- Move to Option B only when you need complex page builders.

### Optional: Favorites (only if you add customer accounts)

- `User` (Django auth)
- `FavoriteApartment`: (`user`, `apartment`, `created_at`) unique together

---

## API Design (REST)

### Conventions

- Base path: `/api/v1/`
- Pagination: DRF page-number pagination
  - `?page=1&page_size=12`
- Filtering: `django-filter`
- Language selection:
  - Option A: return all languages (object `{uz,ru,en}`)
  - Option B: return one language based on `Accept-Language` or `?lang=uz`

**Recommendation:** return a consistent multi-lang object for content fields, and optionally support `?lang=` to flatten.

Example (multi-lang):

```json
{
  "title": { "uz": "...", "ru": "...", "en": "..." }
}
```

---

## Endpoints (what the frontend needs)

### Projects

- `GET /api/v1/projects/`
  - Filters:
    - `status=under_construction|for_sale|completed|all`
    - `class=comfort|business|premium|all`
    - `search=<text>` (optional)
  - Sorting:
    - `ordering=delivery_date,-created_at` (standard DRF ordering)
- `GET /api/v1/projects/{id}/`
- `GET /api/v1/projects/by-slug/{slug}/` *(optional; useful for SEO later)*

**Project detail response should include:**
- project core fields
- gallery images (architectureImages)
- amenities
- apartments (or provide a separate endpoint below)

### Apartments

- `GET /api/v1/apartments/`
  - Filters:
    - `project=<project_id>`
    - `rooms=<int>`
    - `floor_min=<int>&floor_max=<int>`
    - `area_min=<decimal>&area_max=<decimal>`
    - `delivery_year=<int>`
    - `is_available=true|false`
- `GET /api/v1/apartments/{id}/`
- `GET /api/v1/projects/{id}/apartments/` *(optional convenience endpoint)*

### News

- `GET /api/v1/news/`
  - Filters:
    - `category=news|promo|all`
    - `is_published=true` (default true in public API)
  - Pagination (frontend uses “4 per page” currently)
- `GET /api/v1/news/{id}/`
- `GET /api/v1/news/{id}/related/` *(optional; or do this client-side with list endpoint + filters)*

### Leads (Consultation / Contact)

- `POST /api/v1/leads/`
  - Body:
    - `type`: `"consultation"` or `"contact"`
    - `name`
    - `phone`
    - `apartment_id` (optional)
    - `source_page` (optional)
  - Response:
    - `{ "id": "...", "status": "ok", "conversation_id": "..." }`

### Conversations (customer ↔ consultant)

Public (customer-facing):

- `GET /api/v1/conversations/{id}/`
  - Requires a simple access method:
    - Option A: `?token=<signed_token>` returned on lead creation
    - Option B: OTP login by phone (future)
- `GET /api/v1/conversations/{id}/messages/`
- `POST /api/v1/conversations/{id}/messages/`
  - Body: `{ "text": "..." }` (customer message)

Staff (admin/consultant):

- Use Django Admin to reply (fastest), OR
- Add staff API endpoints protected by session/JWT:
  - `POST /api/v1/admin/conversations/{id}/messages/`

Notifications (optional but recommended):
- Email/Telegram/WhatsApp notification to consultants when a new lead/message arrives.

### Media

For simplicity, media is handled as part of model forms (admin) + read-only URLs in API responses.
If you want direct client uploads later:

- `POST /api/v1/uploads/images/` (authenticated admin only)

---

## Admin Experience (Content Management)

Use Django Admin to manage:

- **Projects**: core fields, status/class, map coords, i18n descriptions
  - Inline `ProjectImage` management (drag/drop ordering optional later)
  - Amenities selection (many-to-many)
- **Apartments**: linked to projects, floor plan upload, availability toggle
- **News posts**: i18n title/excerpt/content, publish toggle, image upload
- **Leads**: list view with filters by status/type/date; admin notes + status updates
- **Conversations & Messages**:
  - See lead → open its conversation
  - Assign consultant (`assigned_to`)
  - Reply with messages (inline messages in admin)
- **Site settings/pages**:
  - Update Contact page details (phones/email/address/map)
  - Update footer text/social links
  - (Optional) About page content

---

## Validation Rules (match frontend expectations)

### Lead submission

- `name`: min length 2
- `phone`: min length 9 (you can also normalize to E.164 later)
- Optional rate limiting (recommended in production):
  - limit per IP per minute/hour

---

## Security & Access

### Public API

- Projects/Apartments/News: **read-only** publicly accessible.
- Leads: **write-only** publicly accessible (protected by throttling + basic validation).
- Conversations (customer view):
  - Must be protected so random users cannot read chats
  - Use a **signed access token** per conversation (simple + no customer accounts required)

### Admin API

- Django Admin behind authentication.
- If you add API-based admin tooling later:
  - Use JWT or session auth + CSRF.

---

## Deployment Notes

### Local development

- Run Django on `http://localhost:8000`
- Run Vite frontend on `http://localhost:5173`
- Enable CORS for dev:
  - allow `http://localhost:5173`
- Serve media locally from `/media/`

### Production

- Use PostgreSQL
- Serve API via Gunicorn/Uvicorn behind Nginx
- Serve static files via WhiteNoise or Nginx
- Store media on S3-compatible storage (DigitalOcean Spaces, AWS S3, etc.)
- Add HTTPS

---

## API Response Shapes (recommended)

### Project (list)

```json
{
  "id": 1,
  "name": "Skyline Residence",
  "slug": "skyline-residence",
  "location": "Tashkent",
  "status": "for_sale",
  "class": "business",
  "thumbnail_image_url": "https://.../media/projects/thumb.jpg",
  "short_description": { "uz": "...", "ru": "...", "en": "..." }
}
```

### Project (detail)

```json
{
  "id": 1,
  "name": "...",
  "hero_image_url": "...",
  "about_image_url": "...",
  "map": { "lat": 41.31, "lng": 69.24, "embed_url": "..." },
  "descriptions": {
    "short": { "uz": "...", "ru": "...", "en": "..." },
    "full": { "uz": "...", "ru": "...", "en": "..." },
    "architecture": { "uz": "...", "ru": "...", "en": "..." },
    "interior": { "uz": "...", "ru": "...", "en": "..." }
  },
  "amenities": [ { "id": 1, "name": { "uz": "...", "ru": "...", "en": "..." }, "image_url": "..." } ],
  "images": [ { "id": 1, "kind": "architecture", "image_url": "...", "sort_order": 1 } ],
  "apartments": [ { "id": 10, "number": "A-12", "rooms": 3, "area_m2": 86.5, "floor": 5, "delivery_year": 2026, "floor_plan_image_url": "..." } ]
}
```

---

## Implementation Steps (detailed)

1. **Bootstrap Django**
   - Create `backend/` folder, Django project `config`, apps as above
   - Add `.env` support (e.g. `DJANGO_SECRET_KEY`, `DATABASE_URL`, `DEBUG`)
2. **Core settings**
   - DRF config (pagination, filtering, throttling)
   - CORS config for dev
   - Media/static setup
3. **Models + Admin**
   - Implement models listed above
   - Add admin forms and list filters
   - Add admin “conversation” inline messages for quick replies
4. **Serializers**
   - Public serializers (read-only)
   - Lead serializer (write)
   - Conversation + Message serializers (customer-facing)
5. **ViewSets + Routes**
   - Projects, Apartments, News: read-only viewsets with filters
   - Leads: create-only endpoint
   - Conversations: retrieve + list/create messages (token-protected)
6. **OpenAPI**
   - Add Swagger UI endpoint `/api/schema/swagger/`
7. **Seed data (optional)**
   - Management command to import from a JSON export of your current `projectData.ts`
8. **Frontend integration**
   - Add `VITE_API_URL` and swap mock data usage for API calls
9. **Production hardening**
   - Rate limiting for leads
   - S3 media storage
   - Logging + monitoring

---

## What’s Not in Scope (for now)

- Payments/checkout
- Complex CRM workflows
- Rich text editor integration (can be added for News content later)
- Full customer accounts unless you want favorites/auth
- OTP login (recommended later if you want customers to access chat by phone securely)

