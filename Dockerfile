FROM node:17

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --only=development

RUN npm i -g @nestjs/cli

ENTRYPOINT [ "npm run start" ]

EXPOSE 3000