build-node:
	docker build --platform linux/amd64 -t difuks/fuks-blog -f ./.docker/node/Dockerfile .
run-node:
	docker run --name fuks-blog --rm --network="my-blog" difuks/fuks-blog
build-nginx:
	docker build -t difuks/fuks-blog-nginx -f ./.docker/nginx/Dockerfile .
run-nginx:
	docker run --name fuks-blog-nginx --rm -p 80:80 --network="my-blog" difuks/fuks-blog-nginx
