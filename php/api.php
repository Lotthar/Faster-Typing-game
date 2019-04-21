<?php
require_once 'connection.php';
header('Content-type:application/json;charset=utf-8');
http_response_code(200);
// update rezultata odredjenog igraca
function newPlayer()
{
    global $db, $stmt;
    $ime = getParam("naziv", null, false);
    $rezultat = getParam("rezultat", null, false);
    $vrijeme = getParam("vrijeme", null, false);
    $db = getConnection();
    $sql = "Insert into takmicar(ime,rezultat,vrijeme) values (?,?,?)";
    try {
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $ime, PDO::PARAM_STR, 50);
        $stmt->bindParam(2, $rezultat, PDO::PARAM_INT);
        $stmt->bindParam(3, $vrijeme, PDO::PARAM_STR, 10);
        $stmt->execute();
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska pri stvaranju novog igraca!\n $e"];
    }
}
// Najbolji rezultati
function bestScores()
{
    $sql = "select * from takmicar order by rezultat desc limit 7;";
    try {
        $rez = arrayQuery($sql);
        return $rez;
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska pri stvaranju novog igraca!\n $e"];
    }
}
// --------------------------------------------------
// api rezultat
function api()
{
    if (isset($_REQUEST["method"])) {
        switch ($_REQUEST["method"]) {
            case "newPlayer":
                return newPlayer();
            case "bestScores":
                return bestScores();
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
