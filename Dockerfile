# Etapa 1: Build do Angular
FROM node:22-alpine AS build

WORKDIR /app

RUN npm cache clean --force

COPY . .
RUN npm install
RUN npx ng build --configuration production

FROM nginx:latest AS ngi
RUN rm /usr/share/nginx/html/index.html
COPY --from=build /app/dist/tc-pdf-viewer/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY /mime.types /etc/nginx/mime.types

EXPOSE 80