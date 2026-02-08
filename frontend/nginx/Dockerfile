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

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built frontend files from Stage 1
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
