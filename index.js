// Main starting point of app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser"); // body-parser is used for parsing incoming requests
const morgan = require("morgan"); // morgan is for logging incoming requests
const app = express();
const router = require("./router");

// App setup
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
