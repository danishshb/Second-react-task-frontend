import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";


const ResetPassword = () => {
  const [changePassword, setChangePassword] = useState({
    newPassword: "",
  });

  const navigate = useNavigate();
  const  token = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://209.38.164.171/api/user/reset-password/${token}`, { 
        changePassword
      });
      message.success(
        "Password hase been updated.!"
      );
      navigate("/");
      setChangePassword({
        newPassword: "",

      });
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  };
 
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Reset Password</h2>
            <p className="text-center mb-4">Enter your new password below:</p>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ente New Password"
                name="newPassword"
                value={changePassword.newPassword}
                onChange={(e) => setChangePassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={changePassword.confirmPassword}
                onChange={(e) => setChangePassword(e.target.value)}
              />
            </Form.Group> */}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Update Password
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

export default ResetPassword;
