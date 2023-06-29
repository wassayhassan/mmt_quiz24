const mysql = require('mysql2');
/*
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'toprealtyco_admin',
  password: 'I4%VEw})PNZ]',
  database: 'toprealtyco_main'
});
*/


var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'quiz24'
});


db.connect(function (err) {
  if (err) {
    console.log(err)
  }else{
    console.log("Databae connected");
  }
});
module.exports = db;
