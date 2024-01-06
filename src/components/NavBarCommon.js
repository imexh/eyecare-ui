import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavBarCommon.css';
import authService from '../services/auth.service';
import { useNavigate } from "react-router-dom";

export default function NavBarCommon() {
    const expand = false;
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        authService.logout();
        navigate("/login");
        window.location.reload();
    }

    return (
        <div className="navbar-common">
            <Navbar key={expand} expand={expand} data-bs-theme="dark">
                <Container >
                    <Navbar.Brand href="/dashboard">
                        <img
                            alt=""
                            src="/images/eyecaresquarelogo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top navbar-common-brand-image"
                        />{' '}
                        <b>Eye Care</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end">
                        <Offcanvas.Header className='d-flex justify-content-center'>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <img
                                    alt=""
                                    src="/images/eyecaresquarelogowithtext.png"
                                    width="150"
                                    height="150"
                                    className="d-inline-block align-top navbar-common-brand-image"
                                />{' '}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 navbar-offcanvas-navdiv">
                                <Nav.Link href="/dashboard" className='nav-links-navbar'>Dashboard</Nav.Link>
                                <Nav.Link href="/cvs-home" className='nav-links-navbar'>CVS Test</Nav.Link>
                                <Nav.Link href="/health" className='nav-links-navbar'>Health Tips</Nav.Link>
                                <Nav.Link href="usage" className='nav-links-navbar'>Usage Reports</Nav.Link>
                                <Nav.Link href="/profile" className='nav-links-navbar'>Profile</Nav.Link>
                                <Nav.Link href="/settings" className='nav-links-navbar'>Settings</Nav.Link>
                                <Nav.Link href="/help" className='nav-links-navbar'>Help</Nav.Link>
                                <Nav.Link href="/contacts" className='nav-links-navbar'>Contact Us</Nav.Link>
                                <Nav.Link href="/about" className='nav-links-navbar'>About</Nav.Link>
                                <Nav.Link onClick={handleLogout} className='nav-links-navbar'>Logout</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}
