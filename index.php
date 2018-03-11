<?php
$type; //メインコンテンツを判別する変数

if(isset($_GET["type"])){
  $type = $_GET["type"];
}

//テンプレート読み込み//
include("header.php");
include("nav.php");
include("content/".$type.".html");
include("footer.php");