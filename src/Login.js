import React from "react";
import { useState } from "react";
import axios from "axios";

import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { user, token },
      } = await axios.post(
        "http://localhost:4000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate('/usersList')
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Card style={{ width: "50%", marginLeft: "20%", marginTop: "5%" }}>
      <Card.Header>Login Pager</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password </Form.Label>
            <Form.Control
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
