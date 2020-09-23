const http = require("http");
var fs = require("fs");
require("dotenv").config();

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
                  console.log(
                    __dirname + "/site/" + process.env.SITEX + "/index.html"
                  );
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
                  console.log(
                    __dirname + "/site/" + process.env.SITE0 + "/index.html"
                  );
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
                  console.log(
                    __dirname + "/site/" + process.env.SITEX1 + "/index.html"
                  );
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
              res.writeHead(404);
              res.end("Not hosted for this site");
          }
        } catch (e) {
          console.log(e);
        }
      })
      .resume();
  })
  .listen(80);
console.log("Listening on :80");
