FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci && npx prisma generate

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Separate stage to install only production deps + Prisma CLI (which is a devDep).
# This gives us a complete node_modules without cherry-picking individual packages.
FROM node:22-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN PRISMA_VER=$(node -p "require('./package.json').devDependencies.prisma") && \
    npm install "prisma@${PRISMA_VER}" --no-save && \
    npx prisma generate

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 ba-group && \
    adduser --system --uid 1001 ba-user && \
    mkdir -p /app/data && chown ba-user:ba-group /app/data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=ba-user:ba-group /app/.next/standalone ./
COPY --from=builder --chown=ba-user:ba-group /app/.next/static ./.next/static
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/prisma ./prisma

# Use the complete node_modules from the deps stage (replaces the minimal one
# bundled by standalone, which doesn't include Prisma or its dependencies)
COPY --from=deps /app/node_modules ./node_modules

USER ba-user

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
