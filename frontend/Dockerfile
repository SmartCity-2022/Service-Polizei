FROM node:lts as building-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install --omit=dev

COPY ./ /app/

RUN mv -f /app/src/config_dep.ts /app/src/config.ts # Override config with production config

RUN npm run build

## Create NGINX deployment
FROM nginx:latest

COPY --from=building-stage /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
