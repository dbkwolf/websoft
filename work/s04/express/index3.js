"use strict";

// Enable server to run on the port selected
// In our case the user chose the env var DBWEBB_PORT

const port = process.env.DBWEBB_PORT || 1337;

//set up express server
const express = require("express");
const app = express();
const routeIndex = require("./route/index.js");
const middleware = require("./middleware/index.js");
const path = require("path");


app.use(middleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routeIndex);
app.listen(port, logStartUpDetailsToConsole);

//this is the start of our middleware route
//it calls next() after callback ends and proceeds to next middleware
//this is the start of our middleware route
//it calls next() after callback ends and proceeds to next middleware

function logStartUpDetailsToConsole() {
  let routes = [];

  // Find what routes are supported
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === "router") {
      // Routes added as router middleware
      middleware.handle.stack.forEach((handler) => {
        let route;

        route = handler.route;
        route && routes.push(route);
      });
    }
  });

  console.info(`Server is listening on port ${port}.`);
  console.info("Available routes are:");
  console.info(routes);
}