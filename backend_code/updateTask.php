<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);
echo json_encode(['data' => $data]);

if (isset($data['id']) ) {
    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $dbname = "taskmanager";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert task into the database
    $id = $conn->real_escape_string($data['id']);
    $due = date("Y-m-d H:i:s"); // Get the current date and time in the format YYYY-MM-DD HH:MM:SS

    // Update task in the database
    $sql = "UPDATE tasks SET status = 1, completedDate = '$due' WHERE id = '$id'";
    echo json_encode([$sql]);
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
}

