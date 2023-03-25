const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', (req, res) => {
  const { command } = req.body;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error executing command');
    } else {
      console.log(stdout);
      res.send(stdout);
    }
  });
});

module.exports = router;
