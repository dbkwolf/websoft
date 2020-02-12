<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>About</title>

    <?php include('view/header.php') ?>

<img id="kangaroo" src="img/kangaroo.png" onclick="clickOnKangaroo()">
<div id="kangarooing" style="display:none;">
            <img id="shout" src="img/shout.png">
</div>
<img id="fart" src="img/fart.png">

<article>

<h3>About</h3>

<p>This website is part of the course Software Development for the Web a.k.a. websoft <a href="https://www.hkr.se/en/course/DA377B/course-syllabus">DA377B VT20</a>.</p>

<p>So far we are only on week 1 of the course and have been taught introductory things like using github pages and how CSS, Javascript and HTML all relate to each other - more to come.</p>

<p>I choose this image to represent this course:</p>

<p><img src="img/102-year-old-student.jpg" width="500" alt="Me on an image"> </p>

<p>Here I provide a <a href="https://github.com/Webbprogrammering/websoft">link</a> to the course repo on GitHub.</p>


</article>


</div>
<?php include('view/footer.php') ?>
<script type="text/javascript" src="js/kangaroo.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
