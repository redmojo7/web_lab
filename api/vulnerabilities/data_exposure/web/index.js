import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import apiRouter from './routes/api.js';


const app = express();
app.use(expressLayouts);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs'); // Set EJS as the view engine



app.get('/', (req, res) => {
    res.render('index', { title: 'Home' , email: '', error: ''});
    //res.render('index');
});


// handle POST request to /login
app.use('/api', apiRouter);


const port = 9400;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
