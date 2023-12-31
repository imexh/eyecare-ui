import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Contacts.css';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { Placeholder } from 'react-bootstrap';

export default function Contacts() {
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getContactDetails()
      .then((response) => {
        setEmail(response.data.contactUs.email);
        setContact(response.data.contactUs.contactNo);
        setWebsite(response.data.contactUs.websiteUrl);
      })
      .catch((error) => {
        console.log('Private page', error.response);
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate('/login');
          window.location.reload();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className='contacts-background'>
      <NavBarCommon />
      <h1>Contact Us</h1>
      <Container className='contactsContainer contactsRow mx-auto card contacts-fonts'>
        <Row className='firstRowContacts'>
          <Col>
            <h3>Reach us out</h3>
          </Col>
        </Row>
        <Row className='secondRowContacts'>
          <Col>
            <span className='text-headings-contacts'>Email</span>
            {loading ? (
              <Placeholder as="p" animation="glow">
                <Placeholder style={{ width: '25%' }} />
              </Placeholder>
            ) : (
              <p className="text-details-contacts">{email}</p>
            )}
          </Col>
        </Row>
        <Row className='thirdRowContacts'>
          <Col>
            <span className='text-headings-contacts'>Contact No</span>
            {loading ? (
              <Placeholder as="p" animation="glow">
                <Placeholder style={{ width: '25%' }} />
              </Placeholder>
            ) : (
              <p className="text-details-contacts">{contact}</p>
            )}
          </Col>
        </Row>
        <Row className='forthRowContacts'>
          <Col>
            <span className='text-headings-contacts'>Website</span>
            {loading ? (
              <Placeholder as="p" animation="glow">
                <Placeholder style={{ width: '25%' }} />
              </Placeholder>
            ) : (
              <p className="text-details-contacts">{website}</p>
            )}
          </Col>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
