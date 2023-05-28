import { Nav, Col } from 'react-bootstrap';
import React, { Component } from 'react';
const { serverIp } = require('./config');

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: `http://${serverIp}:8100/`
    };
  }

  handleNavItemClick = (excercise) => {
    //console.log(`[Nav] exercise: ${excercise}`);
    this.props.onClick(excercise);
  };

  render() {
    const { hidden } = this.props;
    return (
      <Col md={2} style={{ overflowY: 'scroll', height: 'calc(100vh - 56px)'}} hidden={hidden}>
        <Nav defaultActiveKey="/home" className="flex-column">
          <h5 style={{ color: "lightskyblue", textAlign: "center" }}>Exercises</h5>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:8100`)}>SQL Injection</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:8100/chat.php`)}>Cross-Site Scripting</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9100`)}>Broken User Authentication</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9300`)}>Broken Object Level Authorization</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9400`)}>Excessive Data Exposure</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:8100/login.php`)}>Lack of Resources & Rate Limiting</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9500`)}>Mass Assignment</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9600`)}>Security Misconfiguration</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9700/api/v2/books`)}>Improper Assets Management</Nav.Link>
          <Nav.Link style={{ textAlign: "left" }} onClick={() => this.handleNavItemClick(`http://${serverIp}:9800`)}>Insufficient Logging & Monitoring</Nav.Link>
        </Nav>
      </Col>
    );
  }
}

export default Navigation;
