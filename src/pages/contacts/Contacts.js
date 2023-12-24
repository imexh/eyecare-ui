import React from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Contacts.css';
import FooterCommon from '../../components/FooterCommon';


export default function Contacts() {
  return (
    <div>
      <NavBarCommon />
      <Container className='contactsContainer'>
        <h1>Contact Us</h1>
        <Row className='contactsRow mx-auto'>
          <h3>Email</h3>
          <p>eyecare@gmail.com</p>
          <br></br>
          <h3>Contact Number</h3>
          <p>0765656546</p>
          <br></br>
          <h3>Website</h3>
          <p>www.eyecare.com
          </p>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
