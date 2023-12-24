import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavBarCommon.css';

export default function NavBarCommon() {
    const expand = false;

    return (
        <div>
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="/dashboard">Eye Care</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Eye Care
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link href="/cvs-home">CVS Test</Nav.Link>
                                <Nav.Link href="/health">Health Tips</Nav.Link>
                                <Nav.Link href="usage">Usage Reports</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/settings">Settings</Nav.Link>
                                <Nav.Link href="/help">Help</Nav.Link>
                                <Nav.Link href="/contacts">Contact Us</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                                <Nav.Link href="/login">Logout</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}
