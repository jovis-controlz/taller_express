const express = require("express");
const boxen = require("boxen");
//const list_users = require("./models/list_users");
const myUser = require("./models/user");


const appServer = express();

appServer.listen(3000, () => {
  console.log(
    boxen("SERVER IS RUNNING ON PORT 3000", {
      padding: 1,
      borderColor: "green",
    })
  );
});

//Primera parte
appServer.get("/mybasicinfo", (req, res) => {
  res.send("THIS IS MY BASIC INFORMATION - My name is Jovi Mauricio");
});

appServer.get("/myexperience", (req, res) => {
  res.send("THIS IS MY EXPERIENCE");
});

appServer.get("/getrequest", (req, res) => {
  res.send("THIS IS A GET REQUEST");
});

appServer.post("/postrequest", (req, res) => {
  res.send("THIS IS A POST REQUEST");
});

appServer.delete("/deleterequest", (req, res) => {
  res.send("THIS IS A DELETE REQUEST");
});

appServer.put("/putrequest", (req, res) => {
  res.send("THIS IS A PUT REQUEST");
});

//Segunda parte

//Creacion Middleware

appServer.use(express.json());

appServer.get("/user", (req, res) => {
  res.json(myUser);
});

appServer.post("/adduser", (req, res) => {
  console.log(req.body);
  res.send("POST USER ADDED");
});

appServer.post("/updateuser/:idUser", (req, res) => {
  console.log(req.body);
  console.log(req.params.idUser);
  res.send("USER UPDATED");
});

//Ejercicio

let list_users = [];

appServer.post("/createuser", (req, res) => {
  
  let user = {};
  user.id = req.body.id;
  user.nombre = req.body.nombre;
  user.apellido = req.body.apellido;
  user.edad = req.body.edad;
  user.carrera = req.body.carrera;
  list_users.push(user);

  res.send(user);
  console.log("USUARIO CREADO");
  console.log(list_users);
});

appServer.delete("/deleteuser/:idUser", (req, res) => {
  list_users = list_users.filter(user => user.id != req.params.idUser);
  console.log("USUARIO ELIMINADO");
  console.log(list_users);
  res.send(list_users);
});

appServer.get("/showlistusers", (req, res) => {
  res.send(list_users);
  console.log("LISTA DE USUARIOS:");
  console.log(list_users);
});

appServer.get("/showuserid/:idUser", (req, res) => {
  let user = list_users.find(element => element.id == req.params.idUser);
  console.log("USUARIO CON ID: " + req.params.idUser);
  console.log(user);
  res.send(user);
});

appServer.get("/showusernom/:nombre", (req, res) => {
  let user = list_users.find(element => element.nombre == req.params.nombre);
  console.log("USUARIO CON NOMBRE: " + req.params.nombre);
  console.log(user);
  res.send(user);
});

appServer.get("/showuseredad/:edad", (req, res) => {
  let user = list_users.filter(element => element.edad < req.params.edad);
  console.log("USUARIOS CON EDAD MENOR A: " + req.params.edad);
  console.log(user);
  res.send(user);
});



