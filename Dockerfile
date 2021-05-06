FROM node:lts-alpine AS build
WORKDIR /app
COPY front-ui/package.json .
RUN npm install
COPY front-ui .
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/src/app
RUN mkdir ../front-ui
COPY backend-api/package.json .
RUN npm install
COPY backend-api/ .
COPY --from=build /app/dist ../front-ui/dist
EXPOSE 3000
CMD [ "node", "./bin/www" ]