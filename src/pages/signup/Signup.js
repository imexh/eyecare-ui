import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './Signup.css';
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Spinner from 'react-bootstrap/Spinner';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.createAccount(username, email, password, confirmPassword).then(
        () => {
          Navigate("/login");
          window.location.reload();
        },
        (error) => {
          alert(error.response.data.message)
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 leftDiv">
            <div className="firstRow">
              <p className="title">Signup</p>
              <p className="subtitle">Create a new account</p>
            </div>
            <div className="secondRow">
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                  <Form.Label className="signup-form-label">Username</Form.Label>
                  <Form.Control className="signup-form-control" type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="signup-form-label">Email</Form.Label>
                  <Form.Control className="signup-form-control" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="signup-form-label">Password</Form.Label>
                  <Form.Control className="signup-form-control" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                  <Form.Label className="signup-form-label">Confirm Password</Form.Label>
                  <Form.Control className="signup-form-control" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <div className="loginButtonDiv">
                  <Button className="loginButton" variant="primary" type="submit" disabled={loading}>
                    {loading && (
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {loading ? ' Loading...' : 'Signup'}
                  </Button>
                </div>
              </Form>
            </div>
            <div className="thirdRow">
              <p className="signupText">Already have an account?</p>
              <Link to="/login" className="signupLink">Login</Link>
            </div>
          </div>
          <div className="col-md-8 rightDiv" style={{ backgroundImage: 'url("images/signupbackground.jpeg")', backgroundSize: 'cover', minHeight: '100vh' }}></div>
        </div>
      </div>
    </div>
  );
}
