#!/bin/bash

sudo docker image prune 
sudo -u ubuntu /usr/bin/git pull
# stop and remove old container

container_id=`sudo docker container ls |grep strapi-cms:release|awk '{print $1}'`
sudo docker container stop $container_id
sudo docker container rm $container_id -f

# stop and remove old image
image_id=`sudo docker image ls |grep strapi-cms|grep release |awk '{print $3}'`
sudo docker image rm $image_id

# build new image

docker build -t strapi-cms:release .

# verify image exists
tag=`docker image ls |grep strapi-cms| grep release|awk '{print $3}'`
echo $tag

# run the docker image in the back
docker run -dit -p 1337:1337 --name strapi-cms strapi-cms:release

