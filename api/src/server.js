const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = server;
