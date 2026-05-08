FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci && npx prisma generate

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 ba-group && \
    adduser --system --uid 1001 ba-user

COPY --from=builder /app/public ./public
COPY --from=builder --chown=ba-user:ba-group /app/.next/standalone ./
COPY --from=builder --chown=ba-user:ba-group /app/.next/static ./.next/static

USER ba-user

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/node_modules/dotenv ./node_modules/dotenv
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && node server.js"]
