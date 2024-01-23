<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="#">
    <title>Meteo</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="app.js"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="fond"></div>
    <div id="menuDIV">
        <div id="menuCONTENT">
            <input type="text" name='Ville' id='Ville' placeholder="Write a city name" autocomplete="off">
            <div id="researchResult"></div>
        </div>
        <div id="menuGRAB"></div>
    </div>
    <div id="site">
        <h1 id='nomVille'></h1>
        <div id="temps">
            <div><p id='min'></p></div>
            <div><p id='max'></p></div>
        </div>
        <div id="forecastDIV"></div>
    </div>
</body>

</html>