<?php
 
$data = array();
$page = $_POST['str'];

$dsn = 'mysql:dbname=json;host=localhost';
$user = 'root';
$password = '';

$dbh = new PDO($dsn, $user, $password);
$dbh->query('SET NAMES utf8');

$sql = "SELECT * FROM json";
$stmt = $dbh->query($sql);

$array = [];
foreach ($stmt as $row) {
  $array =  $row;
}
$dbh = null;

header('Content-Type: application/json; charset=utf-8');
$aa = "aaa";
echo json_encode($array, JSON_PRETTY_PRINT);
 
?>