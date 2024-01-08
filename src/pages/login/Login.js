import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(username, password).then(
        () => {
          Navigate("/dashboard");
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
            <div className="loginPageFirstRow">
              <p className="title">Login</p>
              <p className="subtitle">Log in to your account</p>
            </div>
            <div className="loginPageSecondRow">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                  <Form.Label className="login-form-label">Username</Form.Label>
                  <Form.Control className="login-form-control" required type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="login-form-label">Password</Form.Label>
                  <Form.Control className="login-form-control" required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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
                    {loading ? ' Loading...' : 'Login'}
                  </Button>
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
