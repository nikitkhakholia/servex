const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
  if (req.hostname.startsWith("www.")) {
    req.sitename = req.hostname.substring(4);
  } else {
    req.sitename = req.hostname;
  }
  req.url = `/site/${req.sitename}` + req.url;

  next();
}, express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "site", req.sitename, "index.html"),

    (err) => {
      console.log(err);
    }
  );
});
app.listen(80);
