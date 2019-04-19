<?php
require_once 'connection.php';
header('Content-type:application/json;charset=utf-8');
http_response_code(200);
// update rezultata odredjenog igraca
function updatePlayerScore()
{
    global $db, $stmt;
    $ime = getParam("naziv", null, false);
    $rezultat = getParam("rezultat", null, false);
    $vrijeme = getParam("vrijeme", null, false);
    $db = getConnection();
    $sql = "Update takmicar set rezultat=?,vrijeme=? where ime=?";
    try {
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $rezultat, PDO::PARAM_INT);
        $stmt->bindParam(2, $vrijeme, PDO::PARAM_STR, 10);
        $stmt->bindParam(3, $ime, PDO::PARAM_STR, 50);
        $stmt->execute();
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska pri stvaranju novog igraca!\n $e"];
    }
}
// Najbolji rezultati

// -------------------------------------------------
function newPlayer()
{
    global $db, $stmt;
    $ime = getParam("naziv", null, false);
    $db = getConnection();
    $sql = "Insert into takmicar(ime) values (?)";
    try {
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $ime, PDO::PARAM_STR, 50);
        $stmt->execute();
    } catch (PDOException $e) {
        return ["status" => -5, "poruka" => "Greska pri stvaranju novog igraca! \n $e"];
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
            case "updateScore":
                return updatePlayerScore();
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
