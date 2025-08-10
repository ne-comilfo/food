<?php
$_POST = json_decode(file_get_contents('php//:input'), true); // чтобы работать с json, по дефолту нельзя
echo var_dump($_POST);