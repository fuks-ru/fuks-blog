#!/bin/bash

FUKS_BLOG_AUTH_POSTGRES_VOLUME="${PWD}/var/fuks-blog-auth-postgres"
FUKS_BLOG_AUTH_POSTGRES_PASSWORD="${FUKS_BLOG_AUTH_POSTGRES_PASSWORD}"
FUKS_BLOG_AUTH_POSTGRES_USER="${FUKS_BLOG_AUTH_POSTGRES_USER}"

docker pull difuks/fuks-blog
docker pull difuks/fuks-blog-nginx

docker stop fuks-blog  &>/dev/nul
docker stop fuks-blog-nginx  &>/dev/nul
docker stop fuks-blog-auth-postgres  &>/dev/nul

docker run --name fuks-blog-auth-postgres \
    --rm -d \
    -e POSTGRES_PASSWORD="${FUKS_BLOG_AUTH_POSTGRES_PASSWORD}" \
    -e POSTGRES_USER="${FUKS_BLOG_AUTH_POSTGRES_USER}" \
    -e POSTGRES_DB=auth \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v "${FUKS_BLOG_AUTH_POSTGRES_VOLUME}":/var/lib/postgresql/data \
     --network="my-blog" \
    postgres:14.2-alpine
docker run --name fuks-blog --rm --network="my-blog" -e PERSONAL_NPM_TOKEN="${PERSONAL_NPM_TOKEN}" -d difuks/fuks-blog
sleep 10
docker run --name fuks-blog-nginx --rm --network="my-blog" -d difuks/fuks-blog-nginx
