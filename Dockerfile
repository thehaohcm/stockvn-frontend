FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add curl

RUN npm install
RUN npm install -g http-server

COPY . .

ENV VUE_APP_API_URL="http://207.180.197.79:30000"

RUN npm run build

EXPOSE 80

CMD ["http-server", "dist", "-p", "80"]
