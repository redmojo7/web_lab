# web_lab

A full-stack web application that uses Docker, Node.js, Express, and React to demonstrate the `OWASP API Top Ten vulnerabilities`.

## Table of Contents

- [web_lab](#web_lab)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
  - [Framework](#Framework)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

## About the Project

The lab (Web Application) will be used to demonstrate how these vulnerabilities can be exploited and to understand how to prevent them. It will involve setting up a testing environment that simulates real-world scenarios. The lab will cover a range of vulnerabilities, including injection attacks, broken authentication and session management, and insufficient logging and monitoring.  Overall, the project is an exciting opportunity to contribute to the field of web application security and make a positive impact in this area.

## Framework
This is a modern, scalable, and maintainable full-stack web applications. By using `Docker`, we can easily package and deploy your application across different environments, while `Node.js` and `Express` provide the server-side infrastructure for handling HTTP requests and serving dynamic content. Finally, `React` enables you to build rich and interactive user interfaces that can communicate with backend APIs.

## Getting Started

Include information about how to get started with the project. This include prerequisites and installation instructions.

### Prerequisites

Before you get started with this project, you'll need to have the following tools and technologies installed:

* `Docker` (v18 or higher)
* `Node.js` (v12 or higher)
* `NPM` (v6 or higher)
* `Express.js` (v4 or higher)
* `React.js` (v16 or higher)

You can download `Docker` from the official website: https://www.docker.com/products/docker-desktop

You can download `Node.js` and NPM from the official website: https://nodejs.org/en/download/

To install `Express.js` and `React.js`, open a terminal window and run the following command:

```
npm install -g express react
```
Once you have these tools installed, you're ready to move on to the next section and start setting up your development environment.

### Installation
#### Create a Node.js-Express Backend Project
Provide step-by-step instructions on how to install the project. 

## Usage

Provide examples and instructions on how to use the project. 
To run the Backend server outside of a Docker:
```
cd api
npm run start
```
To run the Frontend server outside of a Docker:
```
cd client
npm run start
```

## Roadmap

### Phase 1: Setup and Configuration
 1. Create project repository and README file
 2. Define project scope and objectives
 3. Set up development environment and install necessary tools and dependencies
 4. Configure Docker setup for the web application
### Phase 2: Vulnerability Demonstrations
 1. Implement injection attack demonstrations (SQL injection, command injection, etc.)
 2. Implement broken authentication and session management demonstrations
 3. Implement cross-site scripting (XSS) and cross-site request forgery (CSRF) demonstrations
 4. Implement insufficient logging and monitoring demonstrations
### Phase 3: Fixing Vulnerabilities
 1. Analyze and prioritize vulnerabilities found in the testing phase
 2. Develop and implement fixes for identified vulnerabilities
 3. Conduct additional testing to ensure vulnerabilities are successfully fixed
### Phase 4: Documentation and Publication
 1. Create detailed documentation on the vulnerabilities demonstrated and how to prevent them
 2. Publish the project on a public platform (GitHub, etc.) for others to use and learn from
 3. Share the project and findings with the wider web application security community

## Contributing

Explain how others can contribute to the project. This may include guidelines for code contributions, how to report bugs or request features, etc.

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions about this project, please feel free to reach out to us at:

- Email: [peng.cai.perth@gmail.com](peng.cai.perth@gmail.com)
- GitHub: [redmojo7](https://github.com/redmojo7)
## Acknowledgements

We would like to express our sincere gratitude to the following individuals/organizations for their contributions to this project:

- [Open Web Application Security Project (OWASP)](https://owasp.org/) - provided resources and documentation on web application security best practices and common vulnerabilities
