import React from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './Signup.css';
import { Link } from "react-router-dom";

export default function Signup() {
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
              <Form>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
                <div className="loginButtonDiv">
                  <Button className="loginButton" variant="primary" type="submit">Signup</Button>
                </div>
              </Form>
            </div>
            <div className="thirdRow">
              <p className="signupText">Already have an account?</p>
              <Link to="/login" className="signupLink">Login</Link>
            </div>
          </div>
          <div className="col-md-8 rightDiv" style={{ backgroundImage: 'url("images/backgroundsignup.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}></div>
        </div>
      </div>
    </div>
  );
}
