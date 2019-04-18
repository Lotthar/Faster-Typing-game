<?php
require_once 'connection.php';
header('Content-type:application/json;charset=utf-8');
http_response_code(200);
// funkcije
function newPlayer()
{
    global $db, $stmt;
    $ime = getParam("naziv", null, false);
    $db = getConnection();
    $sql = "Insert into takmicar(ime) values (?)";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(1, $ime, PDO::PARAM_STR, 50);
    $stmt->execute();
}
// api rezultat
function api()
{
    if (isset($_REQUEST["method"])) {
        switch ($_REQUEST["method"]) {
            case "newPlayer":
                return newPlayer();
            default:
                return error();
        }
    }
}
function error()
{
    return ["status" => -5, "poruka" => "Metod ili objekat kome pristupate ne postoji."];
}

echo json_encode(api());
