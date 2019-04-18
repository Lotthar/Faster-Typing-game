<?php

$db = null;
$stmt = null;

$base_url = "http://192.168.5.2/FasterTyping-game/";

$db_host = "localhost";
$db_name = "fasttyping";
$db_username = "root";
$db_password = "";
// provjerava je li konekcija vec napravljena ako jeste samo je vraca
// ako nije onda pravi novu 
function getConnection()
{
    global $db, $db_host, $db_name, $db_username, $db_password;
    try {
        if (!$db) {
            $db = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8;", "$db_username", "$db_password", array(
                PDO::MYSQL_ATTR_FOUND_ROWS => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ));
        }
        return $db;
    } catch (PDOException $e) {
        return ($db = null);
    }
}
// vraca sql rezultat 
function arrayQuery($sql)
{
    global $db, $stmt;
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// obavalja exec sql zahtjeve
function queryExec($sql)
{
    global $db, $stmt;
    $db = getConnection();
    $stmt = $db->prepare($sql);
    $stmt->execute();
}
// uzima parametar koji je poslat u zahtjevu
function getParam($param, $defaultValue, $stop)
{
    if (isset($_REQUEST[$param]))
        return $_REQUEST[$param];
    else {
        if ($stop) {
            echo json_encode(error());
            exit();
        } else {
            return $defaultValue;
        }
    }
}
