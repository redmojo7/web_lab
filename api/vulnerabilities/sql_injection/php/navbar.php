<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">My Website</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="index.php">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="about.php">About Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="contact.php">Contact Us</a>
      </li>
    </ul>
    <?php
    
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
      echo '<ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="logout.php">Logout</a></li></ul>';
    } else {
      echo '<ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="index.php">Login</a></li></ul>';
    }
    ?>
  </div>
</nav>
