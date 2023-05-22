const http = require('http');

const username = 'admin';
const password = 'Vc2udrT74%dc@D';

const data = JSON.stringify({
    username: username,
    password: password
});

function registerUser() {
    return new Promise((resolve, reject) => {
      const registerOptions = {
        host: 'localhost',
        port: 9600,
        path: '/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const registerReq = http.request(registerOptions, (registerRes) => {
        let registerBody = '';
        registerRes.on('data', (chunk) => {
          registerBody += chunk;
        });
        registerRes.on('end', () => {
          console.log(registerBody);
          resolve(); // Resolve the promise upon successful registration
        });
        console.debug(`statusCode: ${registerRes.statusCode}`);
      });
  
      registerReq.on('error', (error) => {
        console.error(error);
        reject(error); // Reject the promise if an error occurs
      });
  
      registerReq.write(data);
      registerReq.end();
    });
  }

function loginUser() {
  const options = {
    host: 'localhost',
    port: 9600,
    path: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      console.log(body);
    });
    console.debug(`statusCode: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}



module.exports = {loginUser, registerUser};
