const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
// var url = 'mongodb://mongo1:3001,mongo2:3002,mongoArbiter:3003/?replicaSet=my-mongo-rs1';
var url = 'mongodb://10.21.20.43:3001,10.21.20.43:3002,10.21.20.43:3003/?replicaSet=my-mongo-rs1';
// var url = 'mongodb://127.0.0.1:3001,127.0.0.1:3002,127.0.0.1:3003/?replicaSet=my-mongo-rs1';
// var url = 'mongodb://127.0.0.1:3001,127.0.0.1:3002,127.0.0.1:3003/?replicaSet=my-mongo-rs1';

var i = 0;
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  const db = client.db('test');
  const collection = db.collection('test');
  setInterval(() => {
    collection.insert({
                        "data":i++,
                        "date":new Date()
                      },(err) => {
                        if(!err){
                          console.log("insert ok");
                        }else{
                          console.log("error");
                        }
                      });
  },1000);
});
