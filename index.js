require("dotenv").config();

const express = require("express");

const app = express();
app.use((req, res, next) => {
  console.log(req.headers.host);
  if (
    req.headers.host == process.env.SITE0 ||
    req.headers.host == "www." + process.env.SITE0
  ) {
    express.static(__dirname + "/site/" + process.env.SITE0);
    next();
  } else if (
    req.headers.host == process.env.SITE1 ||
    req.headers.host == "www." + process.env.SITE1
  ) {
    express.static(__dirname + "/site/" + process.env.SITE1);
    next();
  }
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/site/" + req.headers.host + "/index.html");
});
app.listen(80);

console.log("Listening on :80");
