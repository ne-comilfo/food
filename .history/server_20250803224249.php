<?php
$_POST = json_decode(file_get_contents('php//:input'), true); // чтобы работать с json, 
echo var_dump($_POST);