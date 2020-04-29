FROM node:10.16.3-alpine

RUN apk update && apk upgrade
RUN npm install -g yarn

ARG FRONTEND_DIR=/opt/stop-covid-frontend-backoffice

RUN mkdir $FRONTEND_DIR

COPY package.json $FRONTEND_DIR
COPY yarn.lock $FRONTEND_DIR

WORKDIR $FRONTEND_DIR

RUN yarn

COPY . $FRONTEND_DIR

############ ENV
ARG BASE_URL
ENV BASE_URL $BASE_URL

RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]
