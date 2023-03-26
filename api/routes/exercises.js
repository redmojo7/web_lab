const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const axios = require('axios');

const commands = {
  sql_injection_up: 'cd /app/vulnerabilities/sql_injection; docker-compose up --build',
  sql_injection_down: 'cd /app/vulnerabilities/sql_injection; docker-compose down'
}

router.post('/', async (req, res) => {
  const { exercise } = req.body;

  console.debug(`exercise : ${exercise}`);

  if (!Object.keys(commands).includes(exercise)) {
    res.status(400).send('Invalid exercise name');
    return;
  }

  // Execute the selected command
  exec(commands[exercise]);

  // Check the container status every 5 seconds
  let containerReady = false;
  
  const interval = setInterval(async () => {
    try {
      const response = await axios.get('http://172.28.0.6:80');

      console.debug(`exercise response.status: ${response.status}`);

      if (exercise === 'sql_injection_up' && response.status === 200) {
        containerReady = true;
        clearInterval(interval);
        res.send('Inner container is ready!');
      } else if (exercise === 'sql_injection_down' && response.status !== 200) {
        containerReady = true;
        clearInterval(interval);
        res.send('Inner container is stopped!');
      }
    } catch (err) {
      console.error(err);
      if (exercise === 'sql_injection_down') {
        containerReady = true;
        clearInterval(interval);
        res.send('Inner container is stopped!');
      }
    }
  }, 5000);
  

  // Set a timeout of 1 minute to give up waiting for the container to start/stop
  setTimeout(() => {
    if (!containerReady) {
      clearInterval(interval);
      res.status(500).send(`[Timeout] Inner container failed to ${exercise === 'sql_injection_up' ? 'start' : 'stop'}!`);
    }
  }, 60000);
});

module.exports = router;
