const express = require("express");
const server = express();

server.get("/", (req, res) => {

  res.send("Hola mundo!");

});

module.exports = server;
