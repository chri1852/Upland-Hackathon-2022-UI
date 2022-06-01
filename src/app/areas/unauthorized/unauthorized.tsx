import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image} from 'react-bootstrap'
import './unauthorized.css';

export const Unauthorized = () => {
  const navigate = useNavigate()

  const returnClick = () => {
    navigate("/");
  }

  return (
    <Container fluid={true} className="login-page-height bg-secondary text-light">
      <Row>
        <Col xs></Col>
        <Col xs={8}>
          <Row><Image className="m-auto login-image" src="/optimizerIcon.png"/></Row>
          <Row className="text-center">
            <h1>You Don't Have Access to this Page</h1>
            <p>
            Please return to the Main Page and Login
            </p>
          </Row>
          <Form.Group className="button-center">
            <Button variant="dark" onClick={returnClick}>Return</Button>
          </Form.Group>
        </Col>
        <Col xs></Col>
      </Row>
    </Container>
  );
}

export default Unauthorized;