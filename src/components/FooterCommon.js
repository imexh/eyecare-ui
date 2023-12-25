import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function FooterCommon() {
    return (
        <div className="footer-common">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand>Noobz 69</Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}
