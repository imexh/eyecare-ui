import React from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FooterCommon from '../../components/FooterCommon'

export default function Profile() {
  return (
    <div>
      <NavBarCommon />
      <Container className='profileAccordionContainer'>
        <Accordion className='profileAccordion'>
          <h1>Profile</h1>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Name: Imesh Ranawella</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputName" placeholder="New name" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Username: imexh</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputUsername" placeholder="New username" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Email: imexh@gmail.com</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputEmail" placeholder="New email" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Contact No: 0767676543</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputContact" placeholder="New contact number" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Birthday: 08/10/2000</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputBirthday" placeholder="New birthday" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Password</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                    <Form.Control id="inlineFormInputPassword" placeholder="New password" />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button type="submit">Change</Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <FooterCommon />
    </div>
  )
}
