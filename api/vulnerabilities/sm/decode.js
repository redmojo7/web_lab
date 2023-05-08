// decode.js

const crypto = require('crypto');

const sessionId = process.argv[2];
const secret = process.argv[3];

if (!sessionId || !secret) {
  console.error('Session ID and secret are required.');
  process.exit(1);
}

const signature = crypto
  .createHmac('sha256', secret)
  .update(sessionId)
  .digest('base64')
  .replace(/\=+$/, '');

console.debug(`Session ID: ${sessionId}`);
console.debug(`Secret: ${secret}`);
console.debug(`Signature: ${signature}`);

console.debug(`\nconnect.sid=s%3A${sessionId}.${signature}\n`);

