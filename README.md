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

## 複製集
Setting up the network：
```
$ sudo docker network ls

//adding a new network called my-mongo-cluster

$ sudo sudo docker network create my-mongo-cluster
```
Setting up our containers：
```
$ sudo docker run -tid -p 3001:27017 --name mongo1 --net my-mongo-cluster mongo mongod --replSet my-mongo-rs1
$ sudo docker run -tid -p 3002:27017 --name mongo2 --net my-mongo-cluster mongo mongod --replSet my-mongo-rs1
```
* docker run：start container from an image
* -p 3001:27017：expose port 27017 to port 3001 on the localhost
* --name mongo1：name this container "mongo1"
* --net my-mongo-cluster：add this container on "my-mongo-cluster" network
* mongo：use image name
* mongod --replSet my-mongo-set：run mongod while adding this mongod instance to the replica set named "my-mongo-rs1"

Setting up replication：
```
$ sudo docker exec -ti mongo1 mongo
> db = (new Mongo('localhost:27017')).getDB('test')
> config={"_id":"my-mongo-rs1","members":[{"_id":0,"host":"mongo1:27017"},{"_id":1,"host":"mongo2:27017"}]}
```
* _id key in the config,should be the same as the --replSet "my-mongo-rs1"

```
> rs.initiate(config)
{ "ok" : 1 }
> db.isMaster()
```
then should change to something like this：
```
my-mongo-rs1:PRIMARY>
```
## 測試複製集：
新增資料：
```
my-mongo-rs1:PRIMARY> db.test.insert({a:123})
WriteResult({ "nInserted" : 1 })

my-mongo-rs1:PRIMARY> db.test.find()
{ "_id" : ObjectId("5acb201ce542338c2802a9d8"), "a" : 123 }
```
查看複製集資料：
```
my-mongo-rs1:PRIMARY> db2=(new Mongo('mongo2:27017')).getDB('test')
test

my-mongo-rs1:PRIMARY> db2.setSlaveOk()
my-mongo-rs1:PRIMARY> db2.mycollection.find()
```
* db2.setSlaveOk()：command to let the shell know that we re intentionally querying a database that is not our primary
