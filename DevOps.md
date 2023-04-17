# DevOps Documentation

This documentation is based on EC2 solution.

* Docker

* Nginx

Prepare EC with VIM and GIT. Set vim as the git editor.

`git config --global core.editor "vim"`





## Inspecting currently running containers

```
ubuntu@ip-172-31-20-5:~$ docker container ls
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied
ubuntu@ip-172-31-20-5:~$ sudo docker container ls
CONTAINER ID   IMAGE                    COMMAND                  CREATED       STATUS       PORTS                                                                      NAMES
9b484c3458d0   dream_ui_front:c1c3e87   "docker-entrypoint.s…"   3 days ago    Up 3 days    0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                  dream_ui_front
f293cd4ece5a   start-cms:v4             "docker-entrypoint.s…"   10 days ago   Up 10 days   0.0.0.0:1337->1337/tcp, :::1337->1337/tcp                                  start-cms
08e025adf207   ubuntu/nginx             "/docker-entrypoint.…"   13 days ago   Up 13 days   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   nginx_reverseproxy
```

Inspecting current images, (subject to changes..)


```
ubuntu@ip-172-31-20-5:~$ sudo docker image ls
REPOSITORY            TAG       IMAGE ID       CREATED       SIZE
dream_ui_front        c1c3e87   0c92900be637   4 days ago    2.36GB
<none>                <none>    814c2653bff9   4 days ago    2.27GB
dream_ui_front        c1c3e     4ea37372168d   4 days ago    2.46GB
dream_start_ui        v2        071c8c8e5dff   9 days ago    2GB
start-cms             v4        4ad14b29f12b   11 days ago   1.48GB
start-cms             v3        4ba5eb78aa3a   11 days ago   1.47GB
start-cms             v2        2706488a87d3   11 days ago   1.47GB
dreamstartui          v2        88afe959d005   11 days ago   2GB
dream_start_backend   v1        20fb7038460a   13 days ago   1.92GB
dream_start-ui        v4        cf8e99bcd916   2 weeks ago   2GB
dream_start-ui        v3        731b914ff2f4   2 weeks ago   2GB
dream_start-ui        v2        f49a3a51b7fc   2 weeks ago   2GB
dream_start-ui        v1        c7435db93574   2 weeks ago   2.42GB
node                  14        7c865c7b3454   3 weeks ago   912MB
node                  latest    0e0ab07dbedd   3 weeks ago   999MB
ubuntu/nginx          latest    c1c59dacd1ed   5 weeks ago   140MB
```

## Orchestration [Swarm or k8s, TODO]

```
kevin@kevin-VirtualBox:~/webbertech/dream_start_backend$ sudo docker service ls
Error response from daemon: This node is not a swarm manager. Use "docker swarm init" or "docker swarm join" to connect this node to swarm and try again.
```

## .env [TODO]

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=FbXn2RrSRAidjQxcuU+D5Q==,792Rd3U2uFQaseM9pz0v+w==,0urKoiAzWg6XpwosGxRNXw==,dLIu4cFWzLH0OBKWJ/GEAw==
API_TOKEN_SALT=SZgKo78KyfLQOlu8gOmfcQ==
ADMIN_JWT_SECRET=XJsGWlO3O2hoWRL1bZq56Q==
TRANSFER_TOKEN_SALT=zC2NNpTRpCzwSfLcRzhxEQ==
JWT_SECRET=IrSwLKzW2uebXQs/A08avQ==
```

# Database

```
DATABASE_HOST=cms-db.cc69hvvdc5ld.us-east-2.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
```

# Deployment

Scripts of the followings are from `history`


  ```
  207  pm2 start ecosystem.config.js
  208  netstat -tnlp
  209  curl localhost:1337
  210  curl localhost:80
  211  clear
  212  pm2 start ecosystem.config.js
  213  pm2 status
  214  pm2 stop ecosystem.config.js 
  215  pm2 -h
  346  sudo docker pull ubuntu/nginx
  347  sudo docker run -dit -p 80:80 -p 443:443 --name nginx_reverseproxy ubuntu/nginx
  348  sudo docker exec -it 08e025 bash
  349  sudo docker ps 
  350  curl localhost:1337
  351  curl localhost:3000
  352  clear
  353  ifconfig
  354  curl 172.31.20.5:1337
  355  clear
  356  cd frontend/
  406  sudo docker run -dit -p 1337:1337 --name start-cms start-cms:v4
  467  sudo docker build -t dream_ui_front:c1c3e87 .
  470  sudo docker run -dit -p 3000:3000 --name dream_ui_front dream_ui_front:c1c3e87
  471  sudo docker ps 
  472  sudo docker logs 96db1924e17a0829d92b08ff93623d9268e04fe23d374a35fffa30e9647d4255
```


## Nginx scripts [TODO: do this in a separate docker file]

ssh to the docker container of the nginx

```
apt update 
apt install curl vim -y
vim custom_server.conf
cd /etc/nginx
cd sites-available/
nginx -s reload
vim custom_server.conf
rm -rf default
ln -s ./custom_server.conf /etc/nginx/sites-enabled/
cd sites-enabled/
rm -rf default 
nginx -t
cd sites-available/
vim custom_server.conf 
ln -s ./custom_server.conf /etc/nginx/sites-enabled/
ln -s ../sites-available/custom_server.conf 
ls
```

```
server {
     listen       80;
     server_name  Webbertech.com;
     location / {
          proxy_pass "http://172.31.20.5:3000";
     }
}
server {
     listen       80;
     server_name  api.Webbertech.com;

     location / {
          proxy_pass "http://172.31.20.5:1337";
     }
}
```


Kill the nginx server, `nginx -s quit`
Restart the ngix server `nginx -s reload`

```


## Commonly used scripts [TODO]
container_id = `docker container ls | grep dream_ui_front | awk '{print $1}'`

sudo docker container stop ${container_id}

sudo docker build -t dream_ui_front:release


## Debugging

docker logs container_id

eg: 

```
ubuntu@ip-172-31-20-5:~/frontend/dream_start_ui$ sudo docker logs d7d142ed8c3f

> webbertech@1.0.0 start
> next start

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /app/.env

```


`docker exec -it container_id bash`

After getting into it, do 

`ps axuw|grep node`




