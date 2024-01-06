import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './FooterCommon.css';

export default function FooterCommon() {
    return (
        <div className="footer-common">
            <Navbar className="footer-font">
                <Container className="d-flex justify-content-center align-items-center">
                    <Navbar.Brand href="/dashboard">
                        <img
                            alt=""
                            src="/images/noobzlogo.png"
                            width="120"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}
