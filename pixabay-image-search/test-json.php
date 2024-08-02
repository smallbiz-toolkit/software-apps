<?php
require_once 'vendor/autoload.php';

// get api key https://pixabay.com/service/about/api/

$pixabayClient = new \Pixabay\PixabayClient([
	'key' => '121692-xxxxxxxxxxxxxxxxxxxxxxxx'
]);

// Get the parameters from the GET request
$params = $_GET;

// Fetch the data from the Pixabay API
$results = $pixabayClient->getImages($params, true);

// Output the results in JSON format
header('Content-Type: application/json');
echo json_encode($results);
?>

