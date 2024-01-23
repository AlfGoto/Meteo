<?php

include '../connectDB.php';

$search = $pdo->prepare('SELECT ville_nom_reel, ville_code_commune FROM villes_france_free WHERE ville_nom_reel LIKE :ville');
$search->bindValue(':ville', $_POST['ville'] . '%');
$search->execute();
$listCITY = $search->fetchAll();

echo json_encode($listCITY);