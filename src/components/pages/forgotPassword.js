import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        // 'http://localhost:8080/api/user/forgot-password',
        'http://209.38.164.171/api/user/forgot-password', 
        { 
        email 
      });
      message.success(
        "Password reset email sent. Check your inbox and spam folder!"
      );
      // navigate("/resetpassword");
      setEmail("");
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Forgot Password</h2>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Reset Password
            </Button>
            <div className="text-center mt-3">
              <p>Remember your password?{" "}
              <Link 
                to="/"
              >
                Login
              </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
