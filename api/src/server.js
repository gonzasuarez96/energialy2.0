const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Hello mundo!");
});

module.exports = server;
