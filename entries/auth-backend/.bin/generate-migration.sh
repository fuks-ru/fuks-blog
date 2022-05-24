export FUKS_BLOG_AUTH_POSTGRES_HOST="localhost"
export FUKS_BLOG_AUTH_POSTGRES_USER="root"
export FUKS_BLOG_AUTH_POSTGRES_PASSWORD="root"

docker run --name fuks-blog-auth-postgres \
  --rm -d \
  -e POSTGRES_PASSWORD="$FUKS_BLOG_AUTH_POSTGRES_USER" \
  -e POSTGRES_USER="$FUKS_BLOG_AUTH_POSTGRES_PASSWORD" \
  -e POSTGRES_DB=auth \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v "/$(pwd)/var/fuks-blog-auth-postgres":/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:14.2-alpine

yarn typeorm dev:migration:generate "/$(pwd)/src/__migration__/$1"

yarn dev:typeorm migration:run

docker stop fuks-blog-auth-postgres
