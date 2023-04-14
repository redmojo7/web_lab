<?php
// Check if the user is not logged in
if (!isset($_SESSION['id'])) {
    // Redirect the user to the index page
    header("Location: index.php");
    exit;
  }
// Check if the registration form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Connect to the database
    $servername = getenv("DB_HOST");
    $username = getenv("DB_USER");
    $password = getenv("DB_PASSWORD");
    $dbname = getenv("DB_NAME");
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Get the values entered in the registration form
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);

    // Check if the username is already taken
    $sql = "SELECT * FROM users WHERE username='" . $username . "'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $response =  "That username is already taken.";
        // Set value attribute for username input field with submitted value
        $username_value = $username;
    } else {
        // Insert the new user into the database with default role of 'user'
        $sql = "INSERT INTO users (username, password, role) VALUES ('$username', '$password', 'user')";
        if (mysqli_query($conn, $sql)) {
            $response =  "Registration successful!";
            // Registration successful, redirect to login page
            //header("Location: index.php");
        } else {
            error_log("Error: " . $sql . "<br>" . mysqli_error($conn));
            $response =  "System error.";
        }
    }

    // Close the database connection
    mysqli_close($conn);
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>My Bootstrap Page</title>
    <!-- Custom CSS for the empty area -->
    <style>
        .empty-area {
            height: 200px;
        }
    </style>
</head>

<body>
    <!-- Your PHP code goes here -->

</body>

</html>

<!DOCTYPE html>
<html lang="en">
<?php require_once('header.php'); ?>

<body>
    <?php require_once('navbar.php'); ?>
    <div class="container mt-5">
        <div class="row">
            <?php if (isset($response) && $response == "Registration successful!") { ?>
                <div class="col-md-6 offset-md-3">
                    <div class="alert alert-success">
                        <p>Congratulations, your account has been created! Here is your information:</p>
                        <ul>
                            <li><strong>Username:</strong> <?php echo $username; ?></li>
                        </ul>
                    </div>
                </div>
            <?php } else { ?>
                <div class="col-md-4"></div>
                <form class="col-md-4" action="register.php" method="POST">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" class="form-control" id="username" name="username" value="<?php echo $username_value; ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <div class="alert <?php echo isset($response) ? 'alert-danger' : 'd-none'; ?>">
                        <?php echo $response; ?>
                    </div>
                    <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#confirm-modal">Register</button>
                </form>
            <?php } ?>
        </div>
        <?php if (isset($response) && $response == "Registration successful!") { ?>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <a href="index.php" class="btn btn-primary btn-block">Go to Login</a>
                </div>
            </div>
        <?php } ?>
    </div>

    <?php require_once('footer.php'); ?>
</body>

</html>