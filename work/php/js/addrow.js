var floater = document.getElementById('btn_float_insert');
var floater_parent = document.getElementById('btn_float_parent');
var insert_tbody = document.getElementById('addrow_tbody');
var no_res = document.getElementById('no_result');
var cancel_insert = document.getElementById('cancel_insert');
var book_r = document.getElementsByClassName('book-row');
var delete_r = document.getElementById('delete_row');

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


for (var i = 0; i < book_r.length; i++) {
  book_r[i].addEventListener("mouseover", function() {
    this.cells[3].hidden = false;
    row_info = prepareRowInfo(this);
    document.getElementById('test').innerHTML = row_info;
  });
  book_r[i].addEventListener("mouseout", function() {
    document.getElementById('test').innerHTML = this.cells[2].innerHTML;
    this.cells[3].hidden = true;
  });
  book_r[i].cells[3].children[0].addEventListener("click", function() {
    console.log("i clicked the delete for row id  " + this.id + row_info);
    if (confirm(`Are you sure you want to permanently delete this book from the database? \n ${row_info}`)) {
      alert("row deleted");
      //send request
    } else {
      alert("deletion canceled");
      //send nothing
    }

  })
}

function prepareRowInfo(row) {
  let alert_str = '';
  for (var i = 0; i < row.cells.length - 1; i++) {
    alert_str += row.cells[i].innerHTML + ' '
  }
  return alert_str;
}