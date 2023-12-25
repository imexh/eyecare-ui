import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './About.css';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";

export default function About() {
  const [aboutText, setAboutText] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAboutText()
      .then((response) => {
        setAboutText(response.data.about.aboutText);
      })
      .catch((error) => {
        console.log("Private page", error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
  }, [navigate]);

  return (
    <div>
      <NavBarCommon />
      <Container className='aboutContainer'>
        <h1>About</h1>
        <Row className='aboutRow mx-auto'>
          <h3>About us</h3>
          <p>{aboutText}</p>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
