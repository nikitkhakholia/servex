const http = require("http");
var static = require("node-static");
var fs = require("fs");
require("dotenv").config();

var site0 = new static.Server(`./site/${process.env.SITE0}`, { cache: 3600 });
var site1 = new static.Server(`./site/${process.env.SITE1}`, { cache: 3600 });
var siteX = new static.Server(`./site/${process.env.SITEX}`, { cache: 3600 });

http
  .createServer((req, res) => {
    req
      .addListener("end", () => {
        try {
          var hostName = req.headers.host.split(":")[0];
          console.log(req.headers.host);
          switch (hostName) {
            case `${process.env.SITEX}`:
              fs.readFile(
                __dirname + "/site/" + process.env.SITEX + "/index.html",
                (err, data) => {
                  if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                  }
                  res.writeHead(200);
                  res.end(data);
                }
              );
              break;
            case `${process.env.SITE0}`:
            case `www.${process.env.SITE0}`:
              fs.readFile(
                __dirname + "/site/" + process.env.SITE0 + "/index.html",
                (err, data) => {
                  if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                  }
                  res.writeHead(200);
                  res.end(data);
                }
              );
              break;
            case `${process.env.SITE1}`:
            case `www.${process.env.SITE1}`:
              fs.readFile(
                __dirname + "/site/" + process.env.SITE1 + "/index.html",
                (err, data) => {
                  if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                  }
                  res.writeHead(200);
                  res.end(data);
                }
              );
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
