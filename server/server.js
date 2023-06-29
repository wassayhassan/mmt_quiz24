const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const db = require("./db/db");
const morgan = require("morgan");
const bcrypt = require('bcryptjs');
const questionRouter = require("./routers/questionsRouter");
const testRouter = require("./routers/testRouter");
const subjectRouter = require("./routers/subjectRouter");
const topicRouter = require("./routers/topicRouter");
const authRouter = require("./routers/authRouter");

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use(session({
  secret: '_lhvudxs%wfhb-ks2vh1l+_g&y)3rw$338d)ia4j&gf&^e_y-=',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: true
}));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

var basic = `http://localhost:8080`;

//static files route
app.use(express.static("files"));


//routes
app.use("/subjects", subjectRouter);
app.use("/questions", questionRouter);
app.use("/tests", testRouter);
app.use("/topics", topicRouter);
app.use("/auth", authRouter);


const server = require('http').Server(app);


app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM Users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
        
    req.session.login = true;
    req.session.uid = rows[0].u_id;
    req.session.save();
    res.status(200).json(rows[0])
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

app.post('/user/logout', async (req, res) => {

});

app.post('/user/info', async (req, res) => {
  try{
    const [rows] = await db.promise().query('SELECT * FROM users WHERE u_id = ?', [req.body.u_id || req.session.uid]);
    console.log(rows[0]);
    res.status(200).json(rows[0]);
  }catch(err){
    res.status(500).json(err.message);
  }

});

function generateUniqueId() {
  // Logic to generate a unique ID, such as using a UUID library or generating a random number

  // Example using a simple random number generator
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.post('/user/insert/info', async (req, res) => {

  const { first_name, last_name, email, password, grade } = req.body;

  let uid = generateUniqueId(); // Generate a unique ID
  let [result] = await db.promise().query(`SELECT u_id FROM Users WHERE u_id = ?`, [uid]);

  // Regenerate a new uid until a unique one is found
  while (result.length > 0) {
    uid = generateUniqueId();
    [result] = await db.promise().query(`SELECT u_id FROM Users WHERE u_id = ?`, [uid]);
  }

  // Insert user info into the "Users" table with the unique uid
  const query = `INSERT INTO Users (u_id, first_name, last_name, email, password, school_grade) VALUES ?`;
  const values = [[uid, first_name, last_name, email, password, grade]];

  db.query(query, [values], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ message: 'User info inserted successfully' });
    }
  })


});

app.post('/user/update/info', (req, res) => {
  var sql = "DELETE FROM article WHERE id = " + mysql.escape(req.body.aid);

  db.query(sql, function (err, result) {
    if (err)
      console.log('error', err.message, err.stack)
    if (result) {
      res.send({});
    }
  });
});

server.listen(port, () => {
  console.log("SERVER IS RUNNING", port);
});