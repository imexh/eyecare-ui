import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './About.css';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
    <div className='aboutBackground'>
      <NavBarCommon />
      <h1>Who are we?</h1>
      <Container className='aboutContainer aboutRow mx-auto card'>
        <Row className='firstRowAbout'>
          <Col>
            {/* <p className='textAbout'>{aboutText}</p> */}
            <p className='textAbout'>We are Team <b className='noobzText'>Noobz69</b> <br />consisting of two IT undergraduates from SLTC Research University.</p>
          </Col>
        </Row>
        <Row className='secondRowAbout'>
          <Col className='d-flex justify-content-center column-row2-about'>
            <div>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="images/imesh.png" />
                <Card.Body>
                  <Card.Title><h4><b>Imesh Ranawella</b></h4></Card.Title>
                  <Card.Text>
                    Bsc (Hons) in Software Engineering
                  </Card.Text>
                  <div className="icon-container-about">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="2x"
                      onClick={() => window.open('https://www.linkedin.com/in/imesh-ranawella/')}
                    />
                    <div className="icon-gap-about"></div>
                    <FontAwesomeIcon
                      icon={faGithub}
                      size="2x"
                      onClick={() => window.open('https://github.com/imexh')}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className='d-flex justify-content-center column-row2-about'>
            <div>
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src="images/vimukthi.png" />
                <Card.Body>
                  <Card.Title><h4><b>Vimukthi Polgolla</b></h4></Card.Title>
                  <Card.Text>
                    Bsc (Hons) in Data Science
                  </Card.Text>
                  <div className="icon-container-about">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="2x"
                      onClick={() => window.open('https://www.linkedin.com/in/vimukthi-polgolla/')}
                    />
                    <div className="icon-gap-about"></div>
                    <FontAwesomeIcon
                      icon={faGithub}
                      size="2x"
                      onClick={() => window.open('https://github.com/VimukthiPolgolla')}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
