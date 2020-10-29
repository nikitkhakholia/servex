const express = require("express");
const path = require("path");
require("dotenv").config();
const https = require("https");
const fs = require("fs");

const app = express();

app.use((req, res, next) => {
  console.log(req.hostname);
  req.url = `/site/${process.env.SITE0}` + req.url;
  // switch (req.hostname) {
  //   case `${process.env.SITE0}`:
  //   case `www.${process.env.SITE0}`:
  //     req.url = `/site/${process.env.SITE0}` + req.url;
  //     break;
  //   case `${process.env.SITE1}`:
  //   case `www.${process.env.SITE1}`:
  //     req.url = `/site/${process.env.SITE1}` + req.url;
  //     break;
  //   case `${process.env.SITE2}`:
  //   case `www.${process.env.SITE2}`:
  //     req.url = `/site/${process.env.SITE2}` + req.url;
  //     break;
  //   default:
  //     return res.send(req.hostname + " not found");
  // }
  next();
}, express.static(__dirname));

app.get("*", (req, res) => {
  switch (req.hostname) {
    case `${process.env.SITE0}`:
    case `www.${process.env.SITE0}`:
      res.sendFile(
        path.resolve(__dirname, "site", process.env.SITE0, "index.html")
      );
      break;
    case `${process.env.SITE1}`:
    case `www.${process.env.SITE1}`:
      res.sendFile(
        path.resolve(__dirname, "site", process.env.SITE1, "index.html")
      );
      break;
    case `${process.env.SITE2}`:
    case `www.${process.env.SITE2}`:
      res.sendFile(
        path.resolve(__dirname, "site", process.env.SITE2, "index.html")
      );
      break;
    default:
      res.send(req.hostname + "not found");
  }
});
app.listen(80);

// const s = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem")),
//   },
//   app
// );
// s.listen(process.env.PORT, "", () => {
//   console.log("Server started " + process.env.PORT);
// });


