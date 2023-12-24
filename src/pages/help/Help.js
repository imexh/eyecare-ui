import React from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Help.css';
import FooterCommon from '../../components/FooterCommon';

export default function Help() {
  return (
    <div>
      <NavBarCommon />
      <Container className='helpContainer'>
        <h1>Help</h1>
        <Row className='helpRow mx-auto'>
          <h3>User Guide</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
