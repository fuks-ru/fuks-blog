FROM node:16.17

WORKDIR /app

COPY .yarn /app/.yarn

COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
COPY .pnp.cjs /app/.pnp.cjs
COPY package.json /app/package.json

COPY packages/common/package.json /app/packages/common/package.json
COPY packages/ui/package.json /app/packages/ui/package.json

COPY entries/blog-backend/package.json /app/entries/blog-backend/package.json
COPY entries/blog-frontend/package.json /app/entries/blog-frontend/package.json
COPY entries/auth-backend/package.json /app/entries/auth-backend/package.json

COPY entries/blog-frontend/public /app/entries/blog-frontend/public

COPY packages/common/dist /app/packages/common/dist
COPY packages/ui/dist /app/packages/ui/dist

COPY entries/blog-backend/dist /app/entries/blog-backend/dist
COPY entries/blog-frontend/dist /app/entries/blog-frontend/dist
COPY entries/blog-frontend/.next /app/entries/blog-frontend/.next
COPY entries/auth-backend/dist /app/entries/auth-backend/dist

RUN chown -R node:node /app

USER node

CMD yarn prod
