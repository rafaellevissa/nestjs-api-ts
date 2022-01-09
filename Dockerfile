FROM node:17

COPY package*.json /app

RUN npm install

COPY . /app

ENTRYPOINT [ "npm start:dev" ]

EXPOSE 3000