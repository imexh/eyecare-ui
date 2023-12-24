import React from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const Navigate = useNavigate();

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 leftDiv">
            <div className="loginPageFirstRow">
              <p className="title">Login</p>
              <p className="subtitle">Log in to your account</p>
            </div>
            <div className="loginPageSecondRow">
              <Form>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="loginButtonDiv">
                  <Button className="loginButton" variant="primary" type="submit" onClick={() => Navigate("/dashboard")}>Login</Button>
                </div>
              </Form>
            </div>
            <div className="loginPageThirdRow">
              <p className="signupText">Don't have an account?</p>
              <Link to="/signup" className="signupLink">Signup</Link>
            </div>
          </div>
          <div className="col-md-8 rightDiv" style={{ backgroundImage: 'url("images/backgroundlogin.png")', backgroundSize: 'cover', minHeight: '100vh' }}></div>
        </div>
      </div>
    </div>
  );
}
