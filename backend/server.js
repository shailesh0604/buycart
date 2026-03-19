const express = require("express");
const app = express();
const port = 4000;
const connectDb = require("./src/config/database")

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDb();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
