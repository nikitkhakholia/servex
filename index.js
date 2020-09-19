const http = require("http");
var static = require("node-static");
require("dotenv").config();

var site0 = new static.Server(`./site/${process.env.SITE0}`, { cache: 3600 });

http
  .createServer((req, res) => {
    req
      .addListener("end", () => {
        try {
          var hostName = req.headers.host.split(":")[0];
          console.log(req.headers.host.split(":")[0]);
          switch (hostName) {
            case `${process.env.SITE0}`:
              site0.serve(req, res);
              break;
            default:
          }
        } catch (e) {
          console.log(e);
        }
      })
      .resume();
  })
  .listen(80);
console.log("Listening on :80");
