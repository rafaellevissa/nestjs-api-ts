FROM node:12.13-alpine as development

WORKDIR /app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development ./dist ./dist
CMD ["node", "dist/main"]