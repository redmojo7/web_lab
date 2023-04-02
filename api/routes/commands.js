const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/', (req, res) => {
  const { command } = req.body;

  if (!command) {
    res.status(400).send('Command is empty');
    return;
  }
  console.debug(`command : ${command}`);

  const timeout = 5000; // Set timeout to 5 seconds
  let timedOut = false;

  // Set a timeout for the exec function
  const timeoutId = setTimeout(() => {
    timedOut = true;
    res.status(500).send('Command timed out');
  }, timeout);

  exec(command, (err, stdout, stderr) => {
    // Clear the timeout so it doesn't execute the callback function
    clearTimeout(timeoutId);

    if (timedOut) {
      // If the command timed out, don't execute the callback function again
      return;
    }

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
