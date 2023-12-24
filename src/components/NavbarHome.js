import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarHome() {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" fixed="top">
                <Container>
                    <Navbar.Brand>Eye Care</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/login" style={{ marginRight: '20px' }}>Login</Nav.Link>
                        <Nav.Link href="/signup">Create Account</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}
