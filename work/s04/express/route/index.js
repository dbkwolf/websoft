"use strict";

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send("Hellow World");

});

router.get("/about", (req, res) => {
  res.send("ABout something");
});

module.exports = router;