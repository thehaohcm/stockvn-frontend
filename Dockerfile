FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add curl

RUN npm install
RUN npm install -g http-server

COPY . .

RUN npm run test

RUN npm run build

EXPOSE 80

CMD ["http-server", "dist", "-p", "80"]
