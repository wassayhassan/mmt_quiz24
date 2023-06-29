const express = require("express");
const router = express.Router();
const db = require("../db/db");
const crypto = require("crypto");


router.post("/login", async(req, res)=> {   
    try {
      const { email, password } = req.body;
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
router.post("/signup", async(req, res)=> {
    try{
        const { first_name, last_name, email, password, grade } = req.body;

        let uid = crypto.randomUUID();
      
        const query = `INSERT INTO Users (u_id, first_name, last_name, email, password, school_grade) VALUES ?`;
        const values = [[uid, first_name, last_name, email, password, grade]];
      
        db.query(query, [values], function (err, result) {
          if (err) {
            res.status(500).json(err.message);
          } else {
            res.status(200).json({ message: 'User Successfull Signed Up' });
          }
        })

    }catch(err){
        res.status(500).json(err.message);
    }
})
module.exports = router;