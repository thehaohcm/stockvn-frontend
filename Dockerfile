# Stage 1: Build the Vue.js application
ARG TARGETARCH=amd64
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g http-server

COPY . .

ENV API_URL="http://207.180.197.79:30000"

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist", "-p", "8080"]