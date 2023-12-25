import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Contacts.css';
import FooterCommon from '../../components/FooterCommon';
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";


export default function Contacts() {
  const [email, setEmail] = useState([""]);
  const [contact, setContact] = useState([""]);
  const [website, setWebsite] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getContactDetails()
      .then((response) => {
        setEmail(response.data.contactUs.email);
        setContact(response.data.contactUs.contactNo);
        setWebsite(response.data.contactUs.websiteUrl);
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
      <Container className='contactsContainer'>
        <h1>Contact Us</h1>
        <Row className='contactsRow mx-auto'>
          <h3>Email</h3>
          <p>{email}</p>
          <br></br>
          <h3>Contact Number</h3>
          <p>{contact}</p>
          <br></br>
          <h3>Website</h3>
          <p>{website}</p>
        </Row>
      </Container>
      <FooterCommon />
    </div>
  )
}
