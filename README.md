## General-Construction (Monorepo)

This repo is split into:

- `frontend/`: React + Vite + Tailwind site
- `backend/`: Django + DRF API + Jazzmin Admin (content managed in admin)

### Frontend (Vite)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Django)

Create a virtual environment, install deps, run migrations, create admin user:

```bash
cd backend
python -m venv .venv

# Windows PowerShell
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- Admin: `http://localhost:8000/admin/`
- API: `http://localhost:8000/api/v1/`
- API docs (Swagger): `http://localhost:8000/api/schema/swagger/`

