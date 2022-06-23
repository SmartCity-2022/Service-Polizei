FROM node:lts as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm ci && npm install typescript --location=global

COPY ./ /app/

RUN tsc

RUN rm -rf /app/node_modules # delete dev dependencies

RUN npm install --omit=dev # install production dependencies

#Create NODE deployment
FROM node:lts

WORKDIR /app

COPY --from=build-stage /app/node_modules /app/node_modules
COPY --from=build-stage /app/build /app/

ENV NODE_ENV=production

EXPOSE 80
CMD node server.js
