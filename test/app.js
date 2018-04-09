const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:3002';

// Database Name
const dbName = 'test';
var i = 0;
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
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
  // client.close();
});
