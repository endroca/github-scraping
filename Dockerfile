FROM node:lts-alpine

WORKDIR /usr/app

COPY . .

RUN yarn
RUN yarn build

RUN rm -rf node_modules
RUN yarn --production

CMD yarn start