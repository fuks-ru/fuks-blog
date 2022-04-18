#!/bin/bash

docker pull difuks/fuks-blog
docker pull difuks/fuks-blog-nginx
docker stop fuks-blog  &>/dev/nul
docker stop fuks-blog-nginx  &>/dev/nul
docker run --name fuks-blog --rm --network="my-blog" -d difuks/fuks-blog
sleep 10
docker run --name fuks-blog-nginx --rm --network="my-blog" -d difuks/fuks-blog-nginx
