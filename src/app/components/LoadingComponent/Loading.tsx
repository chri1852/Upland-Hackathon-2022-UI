import React from 'react';
import { connect } from 'react-redux';
import { Spinner, Row, Col} from 'react-bootstrap'
import './Loading.css';

export const LoadingComponent = () => {

  return (
    <Row className="loading-full-style">
      <Col xs></Col>
      <Col xs={8}>
        <Row><h1 className="text-center">Loading...</h1></Row>
        <Row className="loading-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        </Row>
      </Col>
      <Col xs></Col>
    </Row>
  );
}

export default connect(null, null)(LoadingComponent);