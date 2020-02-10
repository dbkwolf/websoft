"use strict";

// Enable server to run on the port selected
// In our case the user chose the env var DBWEBB_PORT

const port = process.env.DBWEBB_PORT || 1337;

//set up express server
const express = require("express");
const app = express();


//this is the start of our middleware route
//it calls next() after callback ends and proceeds to next middleware

app.use((req, res, next) => {
  console.info(`Got request on ${req.path} (${req.method}).`);
  next();
});

//add route for path /
app.get("/", (req, res) => {
  res.send("Hellow World!")
});

//add route for path /about
app.get("/about", (req, res) => {
  res.send("about something");
});

//start server, listen to requests
app.listen(port, () => {
  console.info("Server is listenign on port " + port);

  //show supported routes
  console.info("Available routes are:");
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.info(r.route.path);
    }
  });
});