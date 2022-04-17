FROM node:16.14.2

WORKDIR /app

COPY . /app

RUN chown -R node:node /app

USER node

CMD yarn prod
