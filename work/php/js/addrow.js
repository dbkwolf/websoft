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


for (var i = 0; i < book_r.length; i++) {
  book_r[i].addEventListener("mouseover", function() {
    // document.getElementById('test').innerHTML = this.cells[2].innerHTML;
    this.cells[3].hidden = false;

  });
  book_r[i].addEventListener("mouseout", function() {
    document.getElementById('test').innerHTML = this.cells[2].innerHTML;
    this.cells[3].hidden = true;
  });
}