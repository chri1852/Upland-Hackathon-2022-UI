import React from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-bootstrap'
import { OptimizerCollectionProperty } from '../../common/types/OptimizerResults';
import './OptimizerCollecitonGroup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


interface OwnProps {
  property: OptimizerCollectionProperty,
  city: string,
  boost: number
}

export const OptimizerPropertyComponent = (props: OwnProps) => {

  const renderProperty = () => {
    return (
      <Row>
        <Col xs={2}><h6>{props.city}</h6></Col>
        <Col xs={3}><h6>{props.property.address}</h6></Col>
        <Col xs={2}><h6>{formatNumberToUPXString(props.property.baseIncome)}</h6></Col>
        <Col xs={1}><FontAwesomeIcon size="1x" icon={faArrowRight}/></Col>
        <Col xs={2}><h6>{formatNumberToUPXString(props.boost * props.property.baseIncome)}</h6></Col>
      </Row>
    );
  }

  const formatNumberToUPXString = (input: number) => {
    return input.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " upx";
  }

  return (
    <div className="bg-dark">
      <Row className="bg-dark collection-grouper-collection-property">
        {renderProperty()}
      </Row>
    </div>
  );
}

export default connect(null, null)(OptimizerPropertyComponent);