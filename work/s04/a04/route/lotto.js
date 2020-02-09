/**
 * Route for today.
 */
"use strict";

var express = require("express");
var router = express.Router();
const max = 36;
const min = 1;

router.get("/", (req, res) => {
  let data = {};

  let lottoArr = new Array(7).fill(0); //initialize arraz of length 7
  lottoArr = lottoArr.map(drawLottoNumbers); //change every value in array to a random number

  data.lotto_numbers = lottoArr.toString(); //package as string

  res.render("lotto_numbers", data);
});

var drawLottoNumbers = () => Math.floor(Math.random() * (max - min) + min); //method returns a random number between 1-35

module.exports = router;