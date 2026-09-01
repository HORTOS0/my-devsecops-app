# ── Stage 1 : Builder ────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci && \
    npm cache clean --force
COPY src/ ./src/

# ── Stage 2 : Image finale de production ─────────────
FROM node:20-alpine AS production
LABEL org.opencontainers.image.source='https://github.com/HORTOS0/my-devsecops-app' \
      org.opencontainers.image.version='1.0.0'

RUN apk add --no-cache wget && \
    addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/src ./src
COPY --chown=appuser:appgroup package*.json ./

USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/app.js"]
