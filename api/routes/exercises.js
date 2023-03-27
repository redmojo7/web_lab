const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const commands = ['sql_injection'];

router.post('/', async (req, res) => {
  const { exercise, action } = req.body;

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
  const command = `/app/vulnerabilities/run_container.sh ${exercise} ${action}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send(stderr);
      return;
    }

    console.debug(`stdout: ${stdout}`);
    console.debug(`stderr: ${stderr}`);
    res.send(stdout);
  });
});

module.exports = router;
