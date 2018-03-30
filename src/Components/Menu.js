import React from "react";
import { Navbar, FormControl, FormGroup, Button, ButtonGroup } from 'react-bootstrap';

const Menu = () => {
  return (
    <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">Brand</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullRight>
        <FormGroup>
          <FormControl type="text" placeholder="Search" />
        </FormGroup>
        <FormGroup>
          <ButtonGroup >
          <Button bsStyle = "primary">Profile</Button>
          <Button bsStyle = "info">Setting</Button>
          <Button bsStyle = "danger">Logout</Button>
          </ButtonGroup>
        </FormGroup>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Menu
