<?php

// Get incoming (without any checks)
$xss = $_GET["id"] ?? null;

// What if if looked like this?
$xss = '<script>alert("hej")</script>';

?>
<p><?= $xss ?></p>
<p><?= htmlentities($xss) ?></p>
<p><?= strip_tags($xss) ?></p>



<?php
// Pure output, no escaping
<p><?= $xss ?></p>
<script>alert("hej")</script>

// Using htmlentities
<p><?= htmlentities($xss) ?></p>
&lt;script&gt;alert(&quot;hej&quot;)&lt;/script&gt;

// Using strip_tags
<p><?= strip_tags($xss) ?></p>
alert("hej")
