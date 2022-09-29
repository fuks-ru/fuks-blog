FROM node:16.17

WORKDIR /app

COPY .yarn /app/.yarn

COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
COPY .pnp.cjs /app/.pnp.cjs
COPY .pnp.loader.mjs /app/.pnp.loader.mjs
COPY package.json /app/package.json

COPY packages/constants/package.json /app/packages/constants/package.json
COPY packages/ui/package.json /app/packages/ui/package.json

COPY entries/backend/package.json /app/entries/backend/package.json
COPY entries/frontend/package.json /app/entries/frontend/package.json

COPY entries/blog-frontend/public /app/entries/frontend/public

COPY packages/constants/dist /app/packages/constants/dist
COPY packages/ui/dist /app/packages/ui/dist

COPY entries/backend/dist /app/entries/backend/dist
COPY entries/frontend/dist /app/entries/frontend/dist
COPY entries/frontend/.next /app/entries/frontend/.next

RUN chown -R node:node /app

USER node

CMD yarn prod
