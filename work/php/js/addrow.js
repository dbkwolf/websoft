var floater = document.getElementById('btn_float_insert');
var floater_parent = document.getElementById('btn_float_parent');
var insert_tbody = document.getElementById('addrow_tbody');
var no_res = document.getElementById('no_result');
var cancel_insert = document.getElementById('cancel_insert');

floater.addEventListener("click", function() {

  insert_tbody.hidden = false;
  floater_parent.hidden = true;
  if (no_res != null) {
    no_res.hidden = true;
  }

});

cancel_insert.addEventListener("click", function() {
  insert_tbody.hidden = true;
  floater_parent.hidden = false;
  if (no_res != null) {
    no_res.hidden = false;
  }
});