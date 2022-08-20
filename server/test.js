var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localpetition.org:PasswordAWS1234@3.68.33.121:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db('localpetition');
  var myquery = {};
  var newvalues = { $set: { status: true } };
  dbo.collection('posts').updateMany(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log('1 document updated');
    db.close();
  });
});
