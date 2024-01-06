import React, { useState, useEffect } from 'react';
import NavBarCommon from '../../components/NavBarCommon';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FooterCommon from '../../components/FooterCommon';
import './Health.css';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";

export default function Health() {
  const [tips, setTips] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const response = AuthService.getCurrentUser();
      PostService.getHealthTips(response.username)
        .then((response) => {
          setTips(response.data.healthTips);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
    } catch (error) {
      console.log("Private page", error.response);
    }
  }, [navigate]);

  return (
    <div className='health-background'>
      <NavBarCommon />
      <h1>Health Tips</h1>
      <Container className='healthContainer healthRow mx-auto card'>
        <Row className='first-row-health health-title-fonts'>
          <Col>
            <p>Suggestions</p>
          </Col>
        </Row>
        <Row className='inner-row-health'>
          <Container className='mx-auto card health-inner-container'>
            {tips.map((tip, index) => (
              <Row className='second-row-health health-body-fonts' key={index}>
                <Col>
                  <p><b>Tip{index + 1}:</b> {tip}</p>
                </Col>
              </Row>
            ))}
          </Container>
        </Row>
      </Container>
      <div className='final-div-health'></div>
      <FooterCommon />
    </div>
  )
}
