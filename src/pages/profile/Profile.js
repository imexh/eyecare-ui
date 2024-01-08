import React, { useState, useEffect } from 'react'
import NavBarCommon from '../../components/NavBarCommon'
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import './Profile.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FooterCommon from '../../components/FooterCommon'
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import Spinner from 'react-bootstrap/Spinner';

export default function Profile() {
  const [name, setName] = useState([""]);
  const [username, setUsername] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [contact, setContact] = useState([""]);
  const [birthday, setBirthday] = useState([""]);

  const [newname, setNewName] = useState([""]);
  const [newemail, setNewEmail] = useState([""]);
  const [newcontact, setNewContact] = useState([""]);
  const [newbirthday, setNewBirthday] = useState([""]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.getCurrentUser() == null) {
      navigate("/login");
    } else {
      const currentUser = AuthService.getCurrentUser().username;
      PostService.getUserDetails(currentUser)
        .then((response) => {
          console.log(response);
          setName(response.data.name);
          setUsername(response.data.username);
          setEmail(response.data.email);
          setBirthday(response.data.birthday);
          setContact(response.data.contactNo);
        })
        .catch((error) => {
          console.log("Private page", error.response);
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
    }
  }, [navigate]);

  const handleChangeName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, newname, birthday, contact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating name:", err);
      alert("Failed to update name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Under construction!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, birthday, newcontact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating contact:", err);
      alert("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, birthday, contact, newemail)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating email:", err);
      alert("Failed to update email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeBirthday = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser().username;
      await PostService.addAccountDetails(currentUser, name, newbirthday, contact, email)
        .then(() => {
          window.location.reload();
        },
          (error) => {
            alert(error.response.data.message)
          }
        );
    } catch (err) {
      console.error("Error updating birthday:", err);
      alert("Failed to update birthday. Please try again.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      alert("Under construction!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile-background'>
      <NavBarCommon />
      <h1>Profile</h1>
      <Container className='profileContainer profileRow mx-auto card'>
        <Row className='first-row-profile profile-title-fonts'>
          <Col>
            <p>Hello, {name}!</p>
          </Col>
        </Row>
        <Row className='inner-row-profile'>
          <Container className='profileContainer mx-auto card profile-inner-container'>
            <Row className='second-row-profile profile-body-fonts'>
              <Col>
                <Container>
                  <Accordion className='profileAccordion'>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header><span className='profile-body-fonts'><b>Name: </b>{name}</span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangeName}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputName" placeholder="New name" onChange={(e) => setNewName(e.target.value)} />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header><span className='profile-body-fonts'><b>Username: </b>{username}</span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangeUsername}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputUsername" placeholder="New username" />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header><span className='profile-body-fonts'><b>Email:</b> {email}</span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangeEmail}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputEmail" placeholder="New email" onChange={(e) => setNewEmail(e.target.value)} />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header><span className='profile-body-fonts'><b>Contact No: </b>{contact}</span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangeContact}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputContact" placeholder="New contact number" onChange={(e) => setNewContact(e.target.value)} />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header><span className='profile-body-fonts'><b>Birthday: </b>{birthday}</span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangeBirthday}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputBirthday" placeholder="New birthday" onChange={(e) => setNewBirthday(e.target.value)} />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header><span className='profile-body-fonts'><b>Password</b></span></Accordion.Header>
                      <Accordion.Body>
                        <Form onSubmit={handleChangePassword}>
                          <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputPassword" placeholder="Current password" />
                            </Col>
                            <Col sm={3} className="my-1">
                              <Form.Control id="inlineFormInputPassword" placeholder="New password" />
                            </Col>
                            <Col xs="auto" className="my-1">
                              <Button className="profile-button" type="submit" disabled={loading}>
                                {loading && (
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                )}
                                {loading ? ' Loading...' : 'Change'}
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Container>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <div className='final-div-profile'></div>
      <FooterCommon />
    </div>
  )
}
