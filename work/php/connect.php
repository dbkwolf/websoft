<?php
/**
 * A page controller
 */

require "src/db_functions.php";

$res = readDatabase();




?>
<h1>Connect to the database</h1>

<p>Show some content in a table.</p>

<table>
    <tr>
        <th>title</th>
        <th>author</th>
        <th>year</th>
    </tr>

<?php foreach($res as $row) : ?>
    <tr>
        <td><?= $row["title"] ?></td>
        <td><?= $row["author"] ?></td>
        <td><?= $row["release_year"] ?></td>
    </tr>
<?php endforeach; ?>

</table>
