const proxyUrl = "https://cors-anywhere.herokuapp.com/"; //proxy that adds cors header
(function () {
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
            for (const kommun of myJson.Kommuner){

             //  let listItem = document.createElement('li');
             // listItem.appendChild(
             //   document.createElement('kommunlist')
             // ).textContent = kommun.Namn;
             // listItem.append(
             //   ` has Code: `
             // );
             // listItem.appendChild(
             //   document.createElement('kommunlist')
             // ).textContent = `${kommun.Kommunkod}`;
             // document.querySelector('ul').appendChild(listItem);

             var opt = document.createElement("option"); // Create the new element
             opt.value = kommun.Kommunkod; // set the value
             opt.text = kommun.Namn; // set the text

             document.getElementById('kommun-dropdown').appendChild(opt); // add it to the select
            }


        })
        //.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

    console.log('Sandbox is ready!');


    // fetch("https://cors-anywhere.herokuapp.com/https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun")
    // .then(response => respone.json())
    // .then(data => {
    //   for (const kommun of data.Kommuner){
    //     let listItem = document.createElement('li');
    //    listItem.appendChild(
    //      document.createElement('kommunlist')
    //    ).textContent = kommun.Namn;
    //    listItem.append(
    //      ` has Code: `
    //    );
    //    listItem.appendChild(
    //      document.createElement('kommunlist')
    //    ).textContent = `${kommun.Kommunkod}`;
    //    myList.appendChild(listItem);
    //   }
    // });



})();

function populateTable(evt){
  console.log(evt.target.value);


  const url = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/" + evt.target.value;
  fetch(proxyUrl + url)
      .then((response) => {
          return response.json();
      })
      .then((myJson) => {
          console.log(myJson);
           for (const skola of myJson.Skolenheter){

             var new_tbody = document.createElement('tbody');



             var table = document.getElementById('skolenheter-table');
             var newRow = table.insertRow(table.rows.length);
           var schoolNameCell = newRow.insertCell(0);
           var schoolCodeCell = newRow.insertCell(1);
           schoolNameCell.innerHTML = skola.Skolenhetsnamn;
           schoolCodeCell.innerHTML = skola.Skolenhetskod;

          // for (const kommun of myJson.Kommuner){
          //
          //
          //  var opt = document.createElement("option"); // Create the new element
          //  opt.value = kommun.Kommunkod; // set the value
          //  opt.text = kommun.Namn; // set the text
          //
          //  document.getElementById('kommun-dropdown').appendChild(opt); // add it to the select
          // }
          }

      })
      //.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));

  console.log('Sandbox is ready!');





}
