<?php
/**
 * Showing of a class in PHP
 */
class Book {
    private $title = null;
    private $author = null;
    private $release_year = null;

    public function __construct($title, $author, $release_year)
    {
        $this->title = $title;
        $this->author = $author;
        $this->release_year = $release_year;
    }

    public function setTitle(string $title = null) : void
    {
        $this->title = $title;
    }

    public function setAuthor(string $author = null) : void
    {
        $this->author = $author;
    }

    public function setReleaseYear(string $release_year = null) : void
    {
        $this->release_year = $release_year;
    }

    public function getTitle(){
       return $this->title;
    }

    public function getAuthor(){
      return $this->author;
    }

    public function getReleaseYear(){
      return $this->release_year;
    }

    public function getDetails() : string
    {
        return "Book: {$this->title} by {$this->author} was released in {$this->release_year}.";
    }
}
