/**
 * Route for lotto.
 */
"use strict";

var express = require("express");
var router = express.Router();

const max = 36;
const min = 1;

var drawLottoNumbers = () => Math.floor(Math.random() * (max - min) + min); //method returns a random number between 1-35
const lottoDraw = new Array(7).fill(0).map(drawLottoNumbers);


// /lotto/
router.get("/", (req, res) => {
  let data = {};
  data.lotto_numbers = lottoDraw.toString(); //package as string

  res.render("lotto", data);
});

// /lotto/lotto-json
router.get("/lotto-json", function(req, res) {
  let data = {};
  data.lotto_draw = JSON.stringify(lottoDraw);
  data.mylotto = "";
  data.result = "";
  data.res_json = "";

  var row = req.query.row;
  var rowArray = new Array(7).fill(0);

  //make sure there is a row request and manipulate into int array
  if (row !== undefined) {
    var auxArray = row.split(",");
    auxArray = auxArray.map(toInt);
    Array.prototype.splice.apply(rowArray, [0, auxArray.length].concat(auxArray));
    data.mylotto = rowArray;
  } else {
    console.info("undefined row value - no query")
  }


  //check if any elements of row match the draw
  //if match, show which by using .diff on Array prot.
  const match = (element) => lottoDraw.indexOf(element) >= 0

  let result;
  if (rowArray.some(match)) {
    result = rowArray.diff(lottoDraw);
  } else {
    result = "There was no match"
  }

  data.result = result;

  console.info(rowArray);
  //res.render("lotto-json", data);
  res.json({
    lotto_draw: lottoDraw,
    my_lotto: rowArray,
    my_matches: result
  });
  return


})


// parses string to int
function toInt(element) {
  let intElement;
  if (isNaN(parseInt(element))) {
    console.info("not a number")
  } else {
    intElement = parseInt(element);
  }
  return intElement;
}

//prot sorts array and then compares it with the array passed in param
Array.prototype.diff = function(arr2) {
  var ret = [];
  this.sort();
  arr2.sort();
  for (var i = 0; i < this.length; i += 1) {
    if (arr2.indexOf(this[i]) > -1) {
      ret.push(this[i]);
    }
  }
  return ret;
};

module.exports = router;