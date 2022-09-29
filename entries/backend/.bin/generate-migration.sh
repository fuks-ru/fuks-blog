export FUKS_BLOG_POSTGRES_HOST="localhost"
export FUKS_BLOG_POSTGRES_USER="root"
export FUKS_BLOG_POSTGRES_PASSWORD="root"

docker run --name fuks-blog-postgres \
  --rm -d \
  -e POSTGRES_PASSWORD="$FUKS_BLOG_POSTGRES_USER" \
  -e POSTGRES_USER="$FUKS_BLOG_POSTGRES_PASSWORD" \
  -e POSTGRES_DB=blog \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v "/$(pwd)/var/fuks-blog-postgres":/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:14.2-alpine

yarn dev:typeorm migration:generate "/$(pwd)/src/__migration__/$1"

yarn dev:typeorm migration:run

docker stop fuks-blog-postgres
