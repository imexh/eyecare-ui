import React from 'react'
import NavBarCommon from '../../../components/NavBarCommon'
import FooterCommon from '../../../components/FooterCommon'
import { Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CVSHome.css';
import { useNavigate } from 'react-router-dom';

export default function CVSHome() {
  const Navigate = useNavigate();

  const handleNextButtonClick = () => {
    Navigate("/cvs-input");
  };

  return (
    <div className='cvs-home-Background'>
      <NavBarCommon />
      <h1>Do you have Computer Vision Syndrome?</h1>
      <Container className='cvs-home-Container cvs-home-Row mx-auto card'>
        <Row className='firstRowcvs-home'>
          <Col>
            <p className='textcvs-home'>Welcome to Computer Vision Syndrome Prediction portal, where we aim to raise awareness about the potential risks associated with prolonged digital device usage. Computer Vision Syndrome (CVS) is a condition that arises from the extended use of computers, smartphones, and other digital screens. Common symptoms include eye strain, headaches, blurred vision, and dry eyes, impacting the overall visual health and well-being of individuals.</p>
            <p className='textcvs-home'>Our platform offers a user-friendly and accessible way to assess the likelihood of experiencing Computer Vision Syndrome. By taking a simple test, you can gain insights into your digital habits and receive a probability score indicating the likelihood of developing CVS based on established patterns and risk factors.</p>
            <p className='textcvs-home'>However, it's crucial to note that our prediction model is not infallible. While we strive to provide accurate and informative results, we emphasize that our platform is not intended for medical diagnosis or treatment. The information generated is purely indicative and should not be used as a substitute for professional medical advice.</p>
            <p className='textcvs-home'>We explicitly disclaim any responsibility for decisions or actions taken based on the predictions provided by our model. It is advisable to consult with a qualified healthcare professional for personalized medical advice and diagnosis regarding any visual health concerns.</p>
            <p className='textcvs-home'>At our core, we are committed to promoting awareness and encouraging users to adopt healthier digital habits. Remember that taking breaks, practicing the 20-20-20 rule, and maintaining proper ergonomics are essential steps in minimizing the risk of Computer Vision Syndrome. Explore our platform responsibly and prioritize your visual health on your digital journey.</p>
          </Col>
        </Row>
        <Row className='secondRowcvs-home'>
          <Col>
            <Button className='cvs-home-buttom' onClick={handleNextButtonClick}>Next</Button>
          </Col>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
