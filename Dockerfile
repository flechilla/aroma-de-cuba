# Stage 1: Build
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile && pnpm add sharp

COPY . .
RUN pnpm build

# Stage 2: Serve with nginx (non-root)
FROM nginx:1.27-alpine AS runtime

# Remove default config and entrypoint scripts that require root
RUN rm -rf /etc/nginx/conf.d/default.conf && \
    rm -rf /docker-entrypoint.d

# Create non-root user and set up writable directories
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup && \
    mkdir -p /var/cache/nginx /var/run && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /usr/share/nginx/html

COPY --chown=appuser:appgroup nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=appuser:appgroup /app/dist /usr/share/nginx/html

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/ || exit 1

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]
