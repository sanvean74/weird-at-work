"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static("public"));

//Use Routes
app.use("/api/users", users);
app.use("/api/posts", posts);

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;
