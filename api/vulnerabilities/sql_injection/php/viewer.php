<!DOCTYPE html>
<html lang="en">
  <?php require_once('header.php'); ?>
  <body>
    <?php require_once('navbar.php'); ?>

    <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <h1>File Viewer</h1>
        <ul class="list-group">
          <?php
          $base = "/var/www/html/";
          $files = array_diff(scandir($base), array('.', '..'));
          foreach ($files as $file) {
            echo '<a href="?file=' . $file . '" class="list-group-item list-group-item-action">' . $file . '</a>';
          }
          ?>
        </ul>
      </div>
      <div class="col-md-8">
        <?php
        if (isset($_GET['file'])) {
          $file = $_GET['file'];
          $path = $base . $file;
          if (file_exists($path)) {
            $file_contents = file_get_contents($path);
            echo '<pre>' . htmlspecialchars($file_contents) . '</pre>';
          } else {
            echo '<div class="alert alert-danger" role="alert">File not found</div>';
          }
        }
        ?>
      </div>
    </div>

    <?php require_once('footer.php'); ?>
  </body>
</html>
