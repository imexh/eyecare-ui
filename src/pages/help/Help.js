import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
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
    <div className='help-background'>
      <NavBarCommon />
      <h1>Help</h1>
      <Container className='helpContainer helpRow mx-auto card'>
        <Row className='first-row-help help-title-fonts'>
          <Col>
            <p>User Manual</p>
          </Col>
        </Row>
        <Row className='inner-row-help'>
          <Container className='helpContainer mx-auto card help-inner-container'>
            <Row className='second-row-help help-body-fonts'>
              <Col>
                <p>{helpText}</p>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <div className='final-div-help'></div>
      <FooterCommon />
    </div>
  )
}
