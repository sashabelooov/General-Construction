# ==================================
# Stage 1: Build React Frontend
# ==================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copy package files first (better Docker cache - only re-installs if deps change)
COPY package*.json ./

# Install dependencies (npm ci uses exact versions from lock file)
RUN npm ci

# Copy frontend source code
COPY . .

# Build for production (uses relative /api/v1 URL by default)
RUN npm run build

# ==================================
# Stage 2: Nginx (serves frontend + proxies to backend)
# ==================================
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config as template (will be processed by envsubst at startup)
COPY nginx/nginx.conf /etc/nginx/templates/nginx.conf.template

# Copy built frontend files from Stage 1
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Default admin URL if not set via environment
ENV DJANGO_ADMIN_URL=gc-management

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# envsubst replaces ${DJANGO_ADMIN_URL} in template, then starts nginx
CMD ["/bin/sh", "-c", "envsubst '${DJANGO_ADMIN_URL}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
