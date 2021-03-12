// create the link to express
const express = require("express");
const server = express();
server.use(express.json());
const PORT = 3000;

//npm cors
const cors = require("cors");
server.use(cors());

// Parsing the Body Request
// const bodyParser = require("body-parser");
server.use(express.json()); // get information from html forms
server.use(express.urlencoded({ extended: true }));

//listen to the server
server.listen(PORT, () => console.log("server listening to port " + PORT));

// create link to the db
let students = require("./db/index");
server.use(express.static("public"));

// GET / => array of students of ./db./index.js
server.get("/", function (req, res) {
  res.send(students);
});
// server.get("/", function (req, res) {
//   res.send(students);
// });

// POST / => body{id, name, company, linkedIn, picture, role} required
server.post("/", (req, res) => {
  const { id, name, company, linkedIn, picture, role } = req.body;
  if (!id || !name || !company || !linkedIn || !picture || !role) {
    return res.status(400).json({
      error: "id, name, company, linkedIn, picture and role are required",
    });
  }
  students.push(req.body);
  res.status(200).json({ status: "success" });
});

// DELETE / => body{id}
server.delete("/", (req, res) => {
  const { id: id } = req.body;
  //students.splice(id, 1);
  students = students.filter((student) => student.id !== id);
  res.status(200).json({ status: "success" });
});
// UPDATE / =>
