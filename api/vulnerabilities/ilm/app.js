const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the view engine

app.get("/", (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route to process the form submission
app.get('/add-to-cart', (req, res) => {
    
    const quantity = req.query.quantity;
    // Decode the query parameter
    const decodedParam = decodeURIComponent(quantity);

    // Check if the decoded parameter includes %0a
    if (decodedParam.includes('\n')) {
        console.log("Failed to parse quantity = " + quantity);
        // The query parameter includes %0a (newline character)
        return res.render('result', { value: null, error: 'You have successfully hacked it.' });
    }

    if (!isNaN(quantity) && quantity > 0) {
        console.log("Success to parse quantity = " + quantity);
        res.render('result', { value: quantity, error: null });
    } else {
        console.log("Failed to parse quantity = " + quantity);
        res.render('result', { value: null, error: 'Invalid input' });
    }
});


app.listen(9800, () => {
    console.log("Server started at port 9800")
});