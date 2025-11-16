FROM node:alpine as builder
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine as production
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/apps/auth/src/main.js"]

