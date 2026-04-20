# =========================
# Development
# =========================
FROM node:18-alpine AS development
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .


# =========================
# Builder
# =========================
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build


# =========================
# Production
# =========================
FROM node:18-alpine AS production
WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main.js"]
