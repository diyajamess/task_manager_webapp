<?php
// fetchTasks.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Database connection
$servername = "localhost";
$username = "root"; // or your DB username
$password = "123456"; // or your DB password
$dbname = "taskmanager"; // your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch tasks
$sql = "SELECT id, name, Description,status,completedDate,due FROM tasks"; // assuming a 'tasks' table
$result = $conn->query($sql);

$tasks = [];

if ($result->num_rows > 0) {
    // Fetch tasks
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
} else {
    echo json_encode(["message" => "No tasks found"]);
    exit;
}

// Return tasks as JSON
echo json_encode($tasks);

// Close connection
$conn->close();

