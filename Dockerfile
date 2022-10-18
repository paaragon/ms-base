# syntax=docker/dockerfile:1

# STAGE: build
FROM node:16.15.0-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# STAGE: run only production
FROM node:16.15.0-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

RUN npm ci --only=production

CMD [ "npm", "start" ]