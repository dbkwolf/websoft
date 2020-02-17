var floater = document.getElementById('btn_float_insert');
var floater_parent = document.getElementById('btn_float_parent');
var insert_tbody = document.getElementById('addrow_tbody');
var no_res = document.getElementById('no_result');
var cancel_insert = document.getElementById('cancel_insert');
var book_r = document.getElementsByClassName('book-row');


floater.addEventListener("click", function() {

  insert_tbody.hidden = false;
  floater_parent.hidden = true;
  if (no_res != null) {
    no_res.hidden = true;
  }
  console.info("i clicked the floater");
});

cancel_insert.addEventListener("click", function() {
  insert_tbody.hidden = true;
  floater_parent.hidden = false;
  if (no_res != null) {
    no_res.hidden = false;
  }
  console.log("i clicked the cancel");
});

var row_info;
var curr_title;
var curr_author;
var curr_year;


function prepareRowInfo(row) {

  curr_title = row.cells[0].innerHTML;
  curr_author = row.cells[1].innerHTML;
  curr_year = row.cells[2].innerHTML;

  let alert_str = '';

  alert_str += 'Title: <b>' + curr_title + '</b> | ';
  alert_str += 'Author: <b>' + curr_author + '</b> | ';
  alert_str += 'Release Year: <b>' + curr_year + '</b> ';

  return alert_str;
}


for (var i = 0; i < book_r.length; i++) {

  book_r[i].addEventListener("mouseover", function() {
    this.cells[3].hidden = false;
    row_info = prepareRowInfo(this);

  });

  book_r[i].addEventListener("mouseout", function() {
    // document.getElementById('test').innerHTML = this.cells[2].innerHTML;
    this.cells[3].hidden = true;
  });

  book_r[i].cells[3].children[0].addEventListener("click", function() {

    document.getElementById('delete-id').value = this.id;
    document.getElementById('book_info').innerHTML = row_info;

  })

  book_r[i].cells[3].children[1].addEventListener("click", function() {

    document.getElementById('edit-id').value = this.id;
    document.getElementById('edit-title').value = curr_title.trim();
    document.getElementById('edit-author').value = curr_author.trim();
    document.getElementById('edit-year').value = curr_year.trim();


    document.getElementById('default-title').value = curr_title.trim();
    document.getElementById('default-author').value = curr_author.trim();
    document.getElementById('default-year').value = curr_year.trim();


  })
}