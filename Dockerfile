FROM node:16

LABEL Author="Ernesto"
LABEL Version="1.0"

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js"]