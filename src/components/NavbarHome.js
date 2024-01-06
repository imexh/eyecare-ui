import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarHome() {
    return (
        <div className="navbar-common">
            <Navbar data-bs-theme="dark" bg="dark">
                <Container >
                    <Navbar.Brand>
                        <img
                            alt=""
                            src="/images/eyecaresquarelogo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top navbar-common-brand-image"
                        />{' '}
                        <b>Eye Care</b>
                    </Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/login" style={{ marginRight: '20px' }}>Login</Nav.Link>
                        <Nav.Link href="/signup">Create Account</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
