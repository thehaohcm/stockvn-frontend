FROM node:lts AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
ENV VUE_APP_API_URL="http://207.180.197.79:30000"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
