const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const port = 5000;
const User = require("./models/User");

//Parsing
app.use(bodyParser.json());

dotenv.config({ path: __dirname + "/config/.env" });

// GET :  RETURN ALL USERS
//route:http://localhost:5000/find
//access:public
app.get("/find", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json({ msg: err }));
});

// POST :  ADD A NEW USER TO THE DATABASE
//route:http://localhost:5000/add
//access:public
app.post("/add", (req, res) => {
  const { name, age } = req.body;
  const newUser = new User({ name, age });
  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

// PUT : EDIT A USER BY ID
//route:http://localhost:5000/findEditSave/:userId
//access:public
app.put("/edit/:userId", (req, res) => {
  User.updateOne(
    { _id: req.params.userId },
    { $set: { name: req.body.name, age: req.body.age } }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

// DELETE : REMOVE A USER BY ID
//ap:http://localhost:5000/remove/:userId
//access:public
app.delete("/findIdAndRemove/:userId", (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

//mongoose connection
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

//Listening
app.listen(port, (err) => (err ? console.log(err) : console.log("connection")));
