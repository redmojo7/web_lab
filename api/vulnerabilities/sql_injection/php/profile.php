<?php
session_start();
// Check if the user is not logged in
require_once 'auth.php';

// Connect to the database
$servername = getenv("DB_HOST");
$username = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
$dbname = getenv("DB_NAME");
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Fetch user data from the database
$sql = "SELECT * FROM users WHERE id = " . $_SESSION['id'];
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
  $username = $row['username'];
  $role = $row['role'];
} else {
  echo "Error: User data not found.";
}

// Close the database connection
mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">
<?php require_once('header.php'); ?>

<body>
  <?php require_once('navbar.php'); ?>
  <div class="container mt-5">
    <h1 class="my-4">Welcome to your profile page!</h1>
    <p>Here's some information about you:</p>
    <ul>
      <li><strong>Username:</strong> <?php echo $username; ?></li>
      <li><strong>Role:</strong> <?php echo $role; ?></li>
    </ul>
  </div>

  <?php require_once('footer.php'); ?>

</body>

</html>