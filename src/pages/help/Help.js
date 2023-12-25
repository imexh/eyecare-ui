import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Help.css';
import FooterCommon from '../../components/FooterCommon';
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const [helpText, setHelpText] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getHelpText()
      .then((response) => {
        setHelpText(response.data.help.helpText);
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
      <Container className='helpContainer'>
        <h1>Help</h1>
        <Row className='helpRow mx-auto'>
          <h3>User Guide</h3>
          <p>{helpText}</p>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
