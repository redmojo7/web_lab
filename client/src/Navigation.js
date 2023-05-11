import React from 'react';
import { Nav, Col } from 'react-bootstrap';

function Navigation() {
    return (
        <Col md={2} style={{ overflowY: 'scroll', height: 'calc(100vh - 56px)' }}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <h5 style={{ color: "lightskyblue", textAlign: "center" }}>Excercises</h5>
              <Nav.Link style={{ textAlign: "left" }} href="/commands">Commands</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/userprofile">SQL Injection</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/xss">Cross-Site Scripting</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/saml">Broken User Authentication</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/bola">Broken Object Level Authorization</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/ede">Excessive Data Exposure</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/lorrl">Lack of Resources & Rate Limiting</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/ma">Mass Assignment</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/sm">Security Misconfiguration</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/iam">Improper Assets Management</Nav.Link>
              <Nav.Link style={{ textAlign: "left" }} href="/ilm">Insufficient Logging & Monitoring</Nav.Link>
            </Nav>
          </Col>
    );
}

export default Navigation;