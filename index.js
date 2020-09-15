const express = require("express");
const app = express();
app.get("/", (req, res) => {
  if (req.hostname === "localhost") {
    console.log(req.hostname);
    express.static("pressdesk");
  }
});
app.listen(80, () => {
  console.log(`Server is running at 80`);
});
