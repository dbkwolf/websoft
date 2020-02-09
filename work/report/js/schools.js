const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //proxy that adds cors header
const table = document.getElementById('skolenheter-table');
(function() {
  'use strict';



  //url = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/1081";

  //const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //proxy that adds cors header
  const url = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun";
  fetch(proxyUrl + url)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      for (const kommun of myJson.Kommuner) {

        var opt = document.createElement("option"); // Create the new element
        opt.value = kommun.Kommunkod; // set the value
        opt.text = kommun.Namn; // set the text

        document.getElementById('kommun-dropdown').appendChild(opt); // add it to the select
      }


    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

  console.log('Sandbox is ready!');

})();


function populateTable(evt) {
  console.log(evt.target.value);
  document.getElementById("loader").style.visibility = "visible";


  const url = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/" + evt.target.value;
  fetch(proxyUrl + url)
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      var old_tbody = table.tBodies[0]
      var new_tbody = document.createElement('tbody');

      for (const skola of myJson.Skolenheter) {

        var newRow = new_tbody.insertRow(0) //table.rows.length);
        var schoolNameCell = newRow.insertCell(0);
        var schoolCodeCell = newRow.insertCell(1);
        schoolNameCell.innerHTML = skola.Skolenhetsnamn;
        schoolCodeCell.innerHTML = skola.Skolenhetskod;

      }
      old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
      document.getElementById("loader").style.visibility = "hidden";

      //document.getElementById("loader").innerHTML = "";

    }).catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));



  console.log('Sandbox is ready!');

}