import React from 'react';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import auth from "./components/Auth/Auth";

const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    auth.logout();
  };


function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Web Lab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav.Item>
              <Nav.Link className="text-white" href="#logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Header;
