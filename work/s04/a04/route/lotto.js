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
  data.lotto_numbers = lottoDraw;
  data.my_lotto = "";
  //data.result = "";
  var row = req.query.row;
  var rowArray = new Array(7).fill(0);
  var copyArr;
  if (row !== undefined) {
    var auxArray = row.split(",");
    auxArray = auxArray.map(toInt);
    Array.prototype.splice.apply(rowArray, [0, auxArray.length].concat(auxArray));
    copyArr = rowArray;
    rowArray = rowArray.map(x => [x, "no-match"]);
    console.log(rowArray);
    const match = (element) => lottoDraw.indexOf(element) >= 0

    let matches;
    if (copyArr.some(match)) {
      matches = copyArr.diff(lottoDraw);
      console.log("matches: " + matches);

      copyArr = copyArr.map(num => {
        let str = "";
        if (matches.includes(num)) {
          str = "match";
        } else {
          str = "no-match";
        }
        return [num, str];
      });
      rowArray = copyArr;
    } else {
      //   result = "There was no match"
    }

  } else {
    console.info("undefined row value - no query")
  }
  //rowArray=rowArray.map(x => [x, "match"]);





  //
  // data.result = result;
  data.my_lotto = rowArray;
  res.render("lotto", data);
});

// /lotto/lotto-json
router.get("/lotto-json", function(req, res) {
  let data = {};
  data.lotto_draw = JSON.stringify(lottoDraw);
  data.res_json = "";
  data.mylotto = "";
  data.result = "";

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
  var result = [];
  this.sort();
  arr2.sort();
  for (var i = 0; i < this.length; i += 1) {
    if (arr2.indexOf(this[i]) > -1) {
      result.push(this[i]);
    }
  }
  return result;
};



module.exports = router;