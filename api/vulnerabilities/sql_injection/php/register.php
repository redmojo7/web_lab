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
            <div class="col-md-12 empty-area">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4"></div>
            <form class="col-md-4" action="register.php" method="get">
                <div class="form-group">
                    <label for="fname">First Name:</label>
                    <input type="text" class="form-control" id="fname" name="fname" value="John">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="col-md-4 mt-4">
                <?php if (isset($_GET['fname'])) {
                    echo $_GET['fname'];
                } ?>
            </div>
        </div>
    </div>
    </div>

    <?php require_once('footer.php'); ?>
</body>

</html>