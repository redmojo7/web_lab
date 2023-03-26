<?php

// Connect to database
$servername = getenv("DB_HOST");
$username = getenv("DB_USER");
$password = getenv("DB_PASSWORD");
$dbname = getenv("DB_NAME");

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Check if the user has submitted the login form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the values entered in the login form
  //$username = mysqli_real_escape_string($conn, $_POST["username"]);
  //$password = mysqli_real_escape_string($conn, $_POST["password"]);

  $username = $_POST["username"];
  $password = $_POST["password"];

  // Search the users table for the entered username and password
  //$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
  
  // Search the users table for the entered username and password
  $sql = "SELECT * FROM users WHERE username='" . $username . "' AND password='" . $password . "'";
  //$sql = "SELECT * FROM users WHERE username='admin'";
  echo "Login SQL query: " . $sql . "<br>";
  
  $result = mysqli_query($conn, $sql);
  echo "Login SQL result: " . mysqli_num_rows($result) . "<br>";
  // Check if there is a matching user
  if (mysqli_num_rows($result) == 1) {
    // Set the user's session data
    $row = mysqli_fetch_assoc($result);
    echo "Login SQL result row: " . $row["username"] . "<br>";
    /*
    $_SESSION["loggedin"] = true;
    $_SESSION["id"] = $row["id"];
    $_SESSION["username"] = $row["username"];
    $_SESSION["role"] = $row["role"];
    */

    // Redirect the user to their profile page
    echo '<script>location.replace("profile.php");</script>';
    exit();
  } else {
    // Display an error message if no matching user was found
    echo "Invalid username or password.";
  }
}

// Close the database connection
mysqli_close($conn);
?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form method="post">
    <div>
      <label for="username">Username:</label>
      <input type="text" name="username" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" required>
    </div>
    <div>
      <input type="submit" value="Login">
    </div>
  </form>
</body>
</html>
