// Main starting point of app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser"); // body-parser is used for parsing incoming requests
const morgan = require("morgan"); // morgan is for logging incoming requests
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB setup
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to auth db.");
});

// middlewares in express - to process incoming request
// app.use() to register middlewares.
app.use(morgan("combined"));
app.use(
  bodyParser.json({
    type: "*/*",
  })
);
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on port: ", port);
