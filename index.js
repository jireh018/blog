const express = require("express");
const app = express();
//router
const auth = require("./routes/auth");
//db
const mongoose = require("mongoose");

app.use(express.json());
app.use("/api/auth", auth);

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(`Error ${err}`));

app.listen(3000, () => console.log(`Server listening on port 3000`));
