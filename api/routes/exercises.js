const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const commands = ['sql_injection', 'saml', 'bola', 'ede', 'ma'];

router.post('/', async (req, res) => {
  const { exercise, action } = req.body;
  const fullUrl = `${req.protocol}://${req.hostname}${req.originalUrl}`;
  console.debug(`fullUrl : ${fullUrl}`);
  console.debug(`exercise: ${exercise}, action: ${action}`);
  
  if (!commands.includes(exercise)) {
    res.status(400).send('Invalid exercise name');
    return;
  }

  if (action !== 'start' && action !== 'stop') {
    res.status(400).send('Invalid action');
    return;
  }

  // Execute the selected command
  const command = `/app/vulnerabilities/run_container.sh ${exercise} ${action} ${req.hostname}`;
  console.debug(`run command: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send(stderr);
      return;
    }
    console.debug(`stderr: ${stderr}`);
    console.debug(`stdout: ${stdout}`);
    res.send(stdout);
  });
});

module.exports = router;
