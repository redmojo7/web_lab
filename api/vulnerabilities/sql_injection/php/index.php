<?php
session_start();
// If the user is logged in, show the home page information
if (isset($_SESSION["username"])) {
  echo '<script>location.replace("profile.php");</script>';
}
// If the user is not logged in, contine

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
  //echo "Login SQL query: " . $sql . "<br>";
  
  $result = mysqli_query($conn, $sql);
  echo "Login SQL result: " . mysqli_num_rows($result) . "<br>";
  // Check if there is a matching user
  if (mysqli_num_rows($result) == 1) {
    // Set the user's session data
    $row = mysqli_fetch_assoc($result);
    //echo "Login SQL result row: " . $row["username"] . "<br>";
    
    $_SESSION["loggedin"] = true;
    $_SESSION["id"] = $row["id"];
    $_SESSION["username"] = $row["username"];
    $_SESSION["role"] = $row["role"];

    // Redirect the user to their profile page
    #header("Location: profile.php");
    echo '<script>location.replace("profile.php");</script>';
    exit();
  } else {
    // Display an error message if no matching user was found
    $response = "Invalid username or password.";
  }
}

// Close the database connection
mysqli_close($conn);
?>

<!DOCTYPE html>
<html>
<?php require_once('header.php'); ?>

<head>
  <title>Login</title>
</head>

<body>
  <?php require_once('navbar.php'); ?>
  <div class="container">
    <h1 class="my-4">Login</h1>
    <div class="alert <?php echo isset($response) ? 'alert-danger' : 'd-none'; ?>">
      <?php echo $response; ?>
    </div>
    <form method="post">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="username">Username:</label>
        <input class="col-sm-4" type="text" class="form-control" name="username" placeholder="Username" required>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="password">Password:</label>
        <input class="col-sm-4" type="password" class="form-control" name="password" placeholder="Password" required>
      </div>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2 text-center">
          <input type="submit" class="btn btn-primary" value="Login">
        </div>
      </div>
    </form>
  </div>
  <?php require_once('footer.php'); ?>
</body>

</html>