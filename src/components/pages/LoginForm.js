import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";
import { AuthContext } from "../context/Auth";


const LoginForm = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        // "http://localhost:8080/api/user/login",
        "http://209.38.164.171/api/user/login",
        loginInfo
      );
      const token = res?.data?.token;
      message.success(res?.data?.message);
      navigate("/dashboard ");
      setAuthToken(token);
      localStorage.setItem("token", token);
      navigate(res?.data?.user?.userType === "admin" ? "/users" : "/profile");
      setLoginInfo({
        email: "",
        password: "",
      });
    } catch (err) {
      message.error(err?.response?.data?.message);
    }
  };

  const token = localStorage.getItem("token");

  if (token && userData?.email) {
    return (
      <Navigate to={userData?.userType === "admin" ? "/users" : "/profile"} />
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Login</h2>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={loginInfo.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginInfo.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="text-center mt-3">
              <p>
                <Link to="/forgotpassword">
                  Forgot Password?
                </Link>
              </p>
            </div>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
            <div className="text-center mt-3">
              <p>
                Don't have an account?
                <Link to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
