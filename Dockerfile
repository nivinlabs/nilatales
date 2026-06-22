# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install only what's needed for npm install
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV ASTRO_TELEMETRY_DISABLED=1

RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Install serve to serve the static build
RUN npm install -g serve

# Copy built static files
COPY --from=builder /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=8080

EXPOSE 8080

# serve dist (NO -s flag — Astro static output has real HTML files per route)
# Using -s would enable SPA fallback and serve index.html for ALL paths
CMD ["serve", "dist", "-l", "tcp://:8080", "--no-clipboard"]
