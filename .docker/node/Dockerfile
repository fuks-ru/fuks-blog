FROM node:16.14.2

WORKDIR /app

COPY .yarn /app/.yarn

COPY yarn.lock /app/yarn.lock
COPY .yarnrc.yml /app/.yarnrc.yml
COPY .pnp.cjs /app/.pnp.cjs
COPY package.json /app/package.json

COPY entries/common/package.json /app/entries/common/package.json
COPY entries/blog-backend/package.json /app/entries/blog-backend/package.json
COPY entries/blog-frontend/package.json /app/entries/blog-frontend/package.json
COPY entries/auth-backend/package.json /app/entries/auth-backend/package.json
COPY entries/api-auth-backend/package.json /app/entries/api-auth-backend/package.json
COPY entries/api-blog-backend/package.json /app/entries/api-blog-backend/package.json
COPY entries/common/package.json /app/entries/common/package.json

COPY entries/blog-frontend/public /app/entries/blog-frontend/public

COPY entries/common/dist /app/entries/common/dist
COPY entries/blog-backend/dist /app/entries/blog-backend/dist
COPY entries/blog-frontend/dist /app/entries/blog-frontend/dist
COPY entries/blog-frontend/.next /app/entries/blog-frontend/.next
COPY entries/auth-backend/dist /app/entries/auth-backend/dist
COPY entries/api-auth-backend/dist /app/entries/api-auth-backend/dist
COPY entries/api-blog-backend/dist /app/entries/api-blog-backend/dist

RUN chown -R node:node /app

USER node

CMD yarn prod
