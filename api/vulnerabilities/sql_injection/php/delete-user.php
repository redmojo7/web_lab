<?php
session_start();

// Check if the user is an admin
if ($_SESSION['role'] !== 'admin') {
  header('Location: index.php');
  exit;
}

// Check if the user ID was submitted
if (!isset($_POST['user_id'])) {
  header('Location: profile.php');
  exit;
}

// Connect to the database
$servername = getenv("DB_HOST");
$username = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
$dbname = getenv("DB_NAME");
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Delete the user from the database
$user_id = mysqli_real_escape_string($conn, $_POST['user_id']);
$sql = "DELETE FROM users WHERE id = $user_id";
if (mysqli_query($conn, $sql)) {
  header('Location: profile.php');
  exit;
} else {
  echo "Error deleting user: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>
