/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Nav, Navbar, Image,
} from 'react-bootstrap';


const NavigationBar = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Brand href="#home">
      <Image
        src="/assets/tyrestock-tyreinstock.png"
        width="210"
        height="44"
        className="d-inline-block align-top"
        alt="Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto" />
      <Nav.Link onClick={() => { props.setSelectedPage('dashboard'); }}>Dashboard</Nav.Link>
      <Nav.Link onClick={() => { props.setSelectedPage('database'); }}>Database</Nav.Link>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
