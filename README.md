# MongoDB on Docker cluster

## create database folder
* ./db/mongos
* ./db/mongo1
* ./db/mongo2
* ./db/mongo3

## Create Docker mongo container
建立所需container：
```
$ sudo docker run -tid --name mongos -p 3000:27017 -v ~/home/titan/Titan/github/docker/mongodb/db/mongos:/data/db mongo
$ sudo docker run -tid --name mongo1 -p 3001:27017 -v ~/home/titan/Titan/github/docker/mongodb/db/mongo1:/data/db mongo
$ sudo docker run -tid --name mongo2 -p 3002:27017 -v ~/home/titan/Titan/github/docker/mongodb/db/mongo2:/data/db mongo
$ sudo docker run -tid --name mongo3 -p 3003:27017 -v ~/home/titan/Titan/github/docker/mongodb/db/mongo3:/data/db mongo
```
查看container狀態：
```
titan@titan-X555LD:~/Titan/github/docker/mongoDB$ sudo docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                     NAMES
d172c1d83cc0        mongo               "docker-entrypoint.s…"   4 minutes ago       Up 4 minutes        0.0.0.0:3003->27017/tcp   mongo3
3ae9ecf0bac2        mongo               "docker-entrypoint.s…"   4 minutes ago       Up 4 minutes        0.0.0.0:3002->27017/tcp   mongo2
d58f5363226b        mongo               "docker-entrypoint.s…"   4 minutes ago       Up 4 minutes        0.0.0.0:3001->27017/tcp   mongo1
4831cd5e825b        mongo               "docker-entrypoint.s…"   5 minutes ago       Up 4 minutes        0.0.0.0:3000->27017/tcp   mongos
```
