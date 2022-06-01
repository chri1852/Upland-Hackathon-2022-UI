import React from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-bootstrap'
import './Error.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

interface OwnProps {
  errorMessage: string;
}

export const ErrorComponent = (props: OwnProps) => {
  return (
    <Row className="error-full-style">
      <Row className="error-icon-height">
        <Col xs></Col>
        <Col xs={8}><FontAwesomeIcon className="error-center fa-10x" icon={faSkullCrossbones}/></Col>
        <Col xs></Col>
      </Row>
      <Row>
        <Col xs></Col>
        <Col xs={8}>
          <Row><h1 className="error-center">Error: {props.errorMessage}</h1></Row>
        </Col>
        <Col xs></Col>
      </Row>
    </Row>
  );
}

export default connect(null, null)(ErrorComponent);