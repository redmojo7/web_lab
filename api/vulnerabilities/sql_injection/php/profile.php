<?php
session_start();
// Check if the user is not logged in
if (!isset($_SESSION['id'])) {
  // Redirect the user to the index page
  header("Location: index.php");
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
    <div class="row mt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Chat Area</div>
          <div class="card-body" id="chat-area"></div>
          <div class="card-footer">
            <div class="input-group">
              <input type="text" class="form-control" id="chat-input" onKeyDown={handleKeyDown} placeholder="Type your message...">
              <div class="input-group-append">
                <button class="btn btn-primary" id="chat-send">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php require_once('footer.php'); ?>

  <script>
    // Handle user input and display it in the chat area
    var chatArea = document.getElementById('chat-area');
    var chatInput = document.getElementById('chat-input');
    var chatSend = document.getElementById('chat-send');

    function handleKeyDown(event) {
      if (event.keyCode === 13) {
        handleClick();
      }
    }

    const handleClick = () => {
      var message = chatInput.value;
      chatInput.value = '';
      var chatBubble = '<div class="chat-bubble">' + '<strong>Me:</strong> \t' + message + '</div>';
      chatArea.innerHTML += chatBubble;

      fetch(`https://api.duckduckgo.com/?q=${message}&format=json`)
        .then(response => response.json())
        .then(data => {
          // Handle the search results here
          // Get the title of the first search result
          const firstResultTitle = data.RelatedTopics[0].Text;
          console.log(firstResultTitle);
          var sysChatBubble = '<div class="chat-bubble">' + '<strong>System:</strong> \t' + firstResultTitle + '</div>';
          chatArea.innerHTML += sysChatBubble;
        })
        .catch(error => {
          // Handle any errors here
          console.error(error);
        });
      /*
      setTimeout(function() {
        var sysChatBubble = '<div class="chat-bubble">' + '<strong>System:</strong> \t' + message + '</div>';
        chatArea.innerHTML += sysChatBubble;
      }, 500);
      */
    }

    chatSend.addEventListener('click', handleClick);
    chatInput.addEventListener('keydown', handleKeyDown);
  </script>
</body>

</html>