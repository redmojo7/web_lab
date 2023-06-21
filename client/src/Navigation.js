import React, { Component } from 'react';
import { Nav, Col } from 'react-bootstrap';
const { serverIp } = require('./config');

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: '1'
    };
  }

  handleNavItemClick = (navId, url) => {
    this.props.onClick(url);
    this.setState({ activeNav: navId });
  };

  renderNavLinks() {
    const { activeNav } = this.state;
    /*
        const navLinks = [
          { id: '1', label: 'SQL Injection', url: `http://${serverIp}:8100` },
          { id: '2', label: 'Cross-Site Scripting', url: `http://${serverIp}:8100/chat.php` },
          { id: '3', label: 'Broken User Authentication', url: `http://${serverIp}:9100` },
          { id: '4', label: 'Broken Object Level Authorization', url: `http://${serverIp}:9300` },
          { id: '5', label: 'Excessive Data Exposure', url: `http://${serverIp}:9400` },
          { id: '6', label: 'Lack of Resources & Rate Limiting', url: `http://${serverIp}:8100/login.php` },
          { id: '7', label: 'Mass Assignment', url: `http://${serverIp}:9500` },
          { id: '8', label: 'Security Misconfiguration', url: `http://${serverIp}:9600` },
          { id: '9', label: 'Improper Assets Management', url: `http://${serverIp}:9700/api/v2/books` },
          { id: '10', label: 'Insufficient Logging & Monitoring', url: `http://${serverIp}:9800` },
        ];
    */
    // hinden vulnerabilities
    const navLinks = [
      { id: '1', label: 'Exercise 1', url: `http://${serverIp}:8100` },
      { id: '2', label: 'Exercise 2', url: `http://${serverIp}:8100/chat.php` },
      { id: '3', label: 'Exercise 3', url: `http://${serverIp}:9100` },
      { id: '4', label: 'Exercise 4', url: `http://${serverIp}:9300` },
      { id: '5', label: 'Exercise 5', url: `http://${serverIp}:9400` },
      { id: '6', label: 'Exercise 6', url: `http://${serverIp}:8100/login.php` },
      { id: '7', label: 'Exercise 7', url: `http://${serverIp}:9500` },
      { id: '8', label: 'Exercise 8', url: `http://${serverIp}:9600` },
      { id: '9', label: 'Exercise 9', url: `http://${serverIp}:9700/api/v2/books` },
      { id: '10', label: 'Exercise 10', url: `http://${serverIp}:9800` },
    ];

    return navLinks.map((navLink) => (
      <Nav.Link
        key={navLink.id}
        style={{ height: '65px', fontSize: '20px' }}
        className={`${activeNav === navLink.id ? '' : 'text-white'}`}
        onClick={() => this.handleNavItemClick(navLink.id, navLink.url)}
      >
        {navLink.label}
      </Nav.Link>
    ));
  }

  render() {
    const { hidden } = this.props;

    return (
      <Col md={2} className="mt-3" style={{ overflowY: 'scroll'}} hidden={hidden}>
        <Nav defaultActiveKey="/home" className="flex-column">
          <h3 className='text-white text-center'>Exercises</h3>
          {this.renderNavLinks()}
        </Nav>
      </Col>
    );
  }
}

export default Navigation;
