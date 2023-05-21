const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the view engine

app.get("/", (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route to process the form submission
app.get('/process', (req, res) => {
    const val = req.query.val;
    //console.log("val:", val);
    if (isNaN(val)) {
        console.log("Failed to parse val = " + val);
        res.render('result', { value: null, error: 'Invalid input' });
    } else {
        console.log("Success to parse val = " + val);
        res.render('result', { value: val, error: null });
    }
});


app.listen(9700, () => {
    console.log("Server started at port 3000")
});