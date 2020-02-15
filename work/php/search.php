<?php
$books = null;
if(isset($_POST['submit-row'])){


  $conn = mysqli_connect('localhost','websoft','test1234','websoft'); //connect to Database

  if(!$conn){
    echo 'connection error'. mysqli_connect_error();
  }

  $new_title =$_POST['new-title'];
  $new_author =$_POST['new-author'];
  $new_year =$_POST['new-year'];
  $sql = '';
  if($new_title==''||$new_author==''||$new_year==''){

    echo "cant be empty";
  }else{
    $sql = "INSERT INTO my_books (book_id,title, author, release_year) VALUES(0, '{$new_title}','{$new_author}','{$new_year}');";

  }
  // echo $sql;



  $result = mysqli_query($conn, $sql);


  mysqli_close($conn);

}

if(isset($_GET['submit-search'])){

  $conn = mysqli_connect('localhost','websoft','test1234','websoft'); //connect to Database

  if(!$conn){
    echo 'connection error'. mysqli_connect_error();
  }

  $search = $_GET['search-input'];

  $sql = '';

  if($_GET['search-input']==''){

    $sql = 'SELECT * FROM my_books';
  }else{
    $sql = "SELECT * FROM my_books WHERE
            MATCH(title) AGAINST('{$search}')
            OR   MATCH(author) AGAINST('{$search}')
            OR  release_year LIKE  '{$search}';";
        // -- title LIKE '{$search}'
        // -- OR author LIKE '{$search}'
        // -- OR release_year LIKE  '{$search}'
        // --  '{$search}';
  }
  // echo $sql;



  $result = mysqli_query($conn, $sql);

  $books = mysqli_fetch_all($result, MYSQLI_ASSOC);

  mysqli_free_result($result);

  mysqli_close($conn);


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
                  </tr>
                </thead>
                <tbody>
                <!-- Populate Table -->
                <?php foreach($books as $book){  ?>


                    <tr id='<?php echo htmlspecialchars($book['book_id']); ?>'>
                      <td>
                        <?php echo htmlspecialchars($book['title']);?>
                      </td>
                      <td>
                        <?php echo htmlspecialchars($book['author']);?>
                      </td>
                      <td>
                        <?php echo htmlspecialchars($book['release_year']);?>
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
                      <tr id="add_row">
                        <form class="col s12" action="search.php" method="POST">

                          <td>
                            <div class="row">
                              <div class="input-field col s12">
                                <input id="input_text" type="text" name="new-title" class="validate" data-length="30">
                                <label class="active" for="add_title">Title</label>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div class="row">
                              <div class="input-field col s12">
                                <input id="add_author" type="text" name="new-author" class="validate" data-length="30">
                                <label class="active" for="add_author">Author</label>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div class="row">
                              <div class="input-field col s12">
                                <input id="add_year" type="text" name="new-year" class="validate" data-length="4">
                                <label class="active" for="add_year">Year</label>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div class="row">
                              <!-- Button: cancel insert of new row -->
                              <div class="input-field col s1 offset-s1">
                                <a id="cancel_insert" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">close</i></a>

                              </div>
                            </div>
                            <div class="row">

                              <div class="input-field col s1 offset-s1">
                                <!-- Button: submit new row via POST -->
                                <input type="submit" class="btn-small green" name="submit-row"value="submit">
                              </div>

                            </div>

                          </td>

                        </form>


                      </tr>

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
