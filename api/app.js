const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  //res.send('This Back-End Home Route');
  res.json({ message: "This Back-End Home Route!" });
});

app.get('/express_backend', (req, res) => { //Line 9
  res.json({ message: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
