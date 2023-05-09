docker run --name postgres-12.14-alpine -v /db-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD="postgres" -p 127.0.0.1:5432:5432 postgres:12.14-alpine
