#!/bin/bash
set -e

echo "==> Waiting for database..."
until python -c "
import os, psycopg2
psycopg2.connect(
    dbname=os.environ.get('POSTGRES_DB', 'general_construction'),
    user=os.environ.get('POSTGRES_USER', 'postgres'),
    password=os.environ.get('POSTGRES_PASSWORD', 'postgres'),
    host=os.environ.get('POSTGRES_HOST', 'db'),
    port=os.environ.get('POSTGRES_PORT', '5432')
)
" 2>/dev/null; do
    echo "    Database not ready, retrying in 2s..."
    sleep 2
done
echo "==> Database is ready!"

echo "==> Running migrations..."
python manage.py migrate --noinput

echo "==> Compiling translations..."
python manage.py compilemessages --ignore=venv 2>/dev/null || echo "    (no new translations to compile)"

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Starting server..."
exec "$@"
