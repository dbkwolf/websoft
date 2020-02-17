<?php

$res = null;
/**
 * Open the database file and catch the exception it it fails
 *
 * @var array $dsn with connection details
 *
 * @return object database connection
 */
function connectDatabase(){

  require "./config.php";
    try {
        $db = new PDO(
            $dsn["dsn"],
            $dsn["username"],
            $dsn["password"]
        );

        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Failed to connect to the database using DSN:<br>\n";
        print_r($dsn);
        throw $e;
    }

    return $db;
}

function readDatabase(){
  // Connect to the database
  $db = connectDatabase();

  // Prepare and execute the SQL statement
  $stmt = $db->prepare("SELECT * FROM my_books");
  $stmt->execute();

  // Get the results as an array with column names as array keys
  $res = $stmt->fetchAll();

  return $res;
}

function searchDatabase($search_str){
  // Connect to the database
  $db = connectDatabase();
  if($search_str==''){
    $res = readDatabase();
  }else{
    $sql = 'SELECT * FROM my_books
            WHERE
            MATCH(title) AGAINST(?)
            OR MATCH(author) AGAINST(?)
            OR release_year LIKE ? ;';

    $stmt = $db->prepare($sql);
    $stmt->execute([$search_str, $search_str, $search_str]);

    // Get the results as an array with column names as array keys
    $res = $stmt->fetchAll();
  }

  return $res;
}

function addToDatabase(Book $book){

  $title = $book->getTitle();
  $author = $book->getAuthor();
  $release_year = $book->getReleaseYear();

  $db = connectDatabase();

  $sql = 'INSERT INTO my_books (book_id,title, author, release_year)
          VALUES(0, ?,?,?);';

  $stmt = $db->prepare($sql);
  $stmt->execute([$title, $author, $release_year]);

  $res = readDatabase();

  return $res;

}

function deleteBookFromDatabase($id){

    $db = connectDatabase();
    $sql = 'DELETE FROM my_books WHERE my_books.book_id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    $res = readDatabase();
}

function editDatabaseTuple($id, $title, $author, $year){

    $db = connectDatabase();

    $sql = "UPDATE my_books SET ";
    //some validation

    $aux_array = array();

    if (!empty($title)){
        array_push($aux_array, "title = ?");
    }

    if(!empty($author)){
        array_push($aux_array,"author = ?");
    }

    if(!empty($year)){
        array_push($aux_array, "year = ?");
    }

    sql.implode(',',$aux_array)

    $sql." WHERE my_books.book_id = ?";
    // $stmt = $db->prepare($sql);
    // $stmt->execute([$id]);
    // $res = readDatabase();

    //// TODO: perform binary tree search for case -> implement case to execute stmt correctly.

}
