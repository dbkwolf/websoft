<?php
$books = null;
require "src/db_functions.php";
require "src/Book.php";

if(isset($_POST['submit-row'])){

  $new_title =$_POST['new-title'];
  $new_author =$_POST['new-author'];
  $new_year =$_POST['new-year'];

  if($new_title==''||$new_author==''||$new_year==''){
    echo "cant be empty";
  }else{
    $new_book = new Book($new_title, $new_author, $new_year);
    $books = addToDatabase($new_book);
  }
}

if(isset($_GET['submit-search'])){
  $search = $_GET['search-input'];
  $books = searchDatabase($search);
}

 ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Search</title>
      <?php include('view/header.php') ?>
          <div class="center">
            <h4>My Books Search</h4>
            <br>
            <div class="test" id="test">

            </div>
            <!-- Input Search -->
            <form action="search.php" method="GET">
            <div class="row">
              <div class="col s12">
                  <div class="row">
                      <div class="input-field col s11">
                        <i class="material-icons prefix">search</i>
                        <input type="text" id="search" name="search-input" class="search" placeholder="Search">
                      </div>
                      <div class="col s1">
                      <input type="submit"class="btn pink lighten-1" name="submit-search" value="submit">
                      </div>
                  </div>
              </div>
            </div>

            </form>
            <!-- Container for Results Table -->
            <div class="row">
              <div class="col s10 offset-s1">
              <table class="highlight">
              <?php if($books!=null){ ?>

                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th style="width: 50px;"></th>
                  </tr>
                </thead>
                <tbody id="books_tbody">
                <!-- Populate Table -->
                <?php foreach($books as $book){  ?>






                    <tr class="book-row" id='<?php echo htmlspecialchars($book['book_id']); ?>'>
                      <td>
                        <?php echo htmlspecialchars($book['title']);?>
                      </td>
                      <td>
                        <?php echo htmlspecialchars($book['author']);?>
                      </td>
                      <td style="width: 100px;">
                        <?php echo htmlspecialchars($book['release_year']);?>
                      </td>
                      <td  style="width: 50px;" hidden>
                          <a id='<?php echo htmlspecialchars($book['book_id']); ?>' class="btn-small waves-effect waves-light red" style="margin-bottom: 5px; margin-left: 10px;"><i class="material-icons"style="font-size:20px;">delete</i></a>
                          <a id="edit_row" class="btn-small waves-effect waves-light blue  " style=" margin-left: 10px;"><i class="material-icons"style="font-size:20px;">edit</i></a>
                      </td>
                    </tr>

                  <?php }?>
                  </tbody>


                   <?php }else{
                     ?> <div id="no_result" class="container align-center">
                       No Results
                     </div> <?php
                   }?>

                   <!-- Extra Line for adding new row -->

                  <tbody id="addrow_tbody" hidden>
                    <form class="col s12" action="search.php" method="POST">

                      <tr id="add_row">


                          <td>
                            <div class="row white">
                              <div class="input-field col s12">
                                <input id="input_text" type="text" name="new-title" class="validate" data-length="120">
                                <label class="active" for="add_title">Title</label>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div class="row white">
                              <div class="input-field col s12">
                                <input id="add_author" type="text" name="new-author" class="validate" data-length="30">
                                <label class="active" for="add_author">Author</label>
                              </div>
                            </div>
                          </td>

                          <td style="width: 100px;">
                            <div class="row white">
                              <div class="input-field col s12">
                                <input id="add_year" type="text" name="new-year" class="validate" data-length="4">
                                <label class="active" for="add_year">Year</label>
                              </div>
                            </div>
                          </td>

                        <td style="width: 50px;">
                          <div class="row ">
                            <div class="col s12">
                              <a id="cancel_insert" class="btn-small waves-effect waves-light red "style="margin-top: 5px; margin-left: 10px;margin-bottom: 5px;"><i class="material-icons">close</i></a>
                              <button type="submit" class="btn-small green " name="submit-row"value="submit" style=" margin-bottom: 5px;margin-left: 10px;"><i class="material-icons">send</i></button>
                            </div>
                          </div>
                        </td>

                      </tr>

                    </form>
                    </tbody>


              </table>

            </div>
            </div>
            <!-- Insert Row Float Button  -->
            <div class="row">
              <div id="btn_float_parent" class="col s1 offset-s11">
                <a id="btn_float_insert" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>

              </div>

            </div>
            <br>
            <!-- Action Buttons -->
            <div class="row">
              <div class="col s3 "><a class="waves-effect waves-light btn-large">Create</a></div>
              <div class="col s3 "><a class="waves-effect waves-light btn-large">Update</a></div>
              <div class="col s3 "><a class="waves-effect waves-light btn-large">Read</a></div>
              <div class="col s3 "><a class="waves-effect waves-light btn-large">Delete</a></div>
            </div>

          </div>


      <?php include('view/footer.php') ?>
  </body>

  <script type="text/javascript" src="js/addrow.js"></script>
<script type="text/javascript" src="js/materialize.min.js"></script>
<script type="text/javascript" src="js/kangaroo.js"></script>
<script type="text/javascript" src="js/main.js"></script>


</html>
