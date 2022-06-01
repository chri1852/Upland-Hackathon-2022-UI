import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-bootstrap'
import { OptimizerCollectionProperty, OptimizerCollectionResult } from '../../common/types/OptimizerResults';
import { OptimizerPropertyComponent } from './OptimizerPropertyComponent';
import './OptimizerCollecitonGroup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../common/styles/colors.css';

interface OwnProps {
  collection: OptimizerCollectionResult,
  type: string
}

export const OptimizerCollection= (props: OwnProps) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpanded =(event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  }

  const getBaseCollectionIncome = () => {
    return props.collection.properties.reduce((prev, cur: OptimizerCollectionProperty) => {return prev + cur.baseIncome}, 0)
  }

  const formatNumberToUPXString = (input: number) => {
    return input.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " upx";
  }

  const renderExpanded = () => {
    if (expanded) {
      return (
        props.collection.properties.map((p) => <OptimizerPropertyComponent key={p.address} property={p} city={props.collection.city} boost={props.collection.boost} />)
      );
    }
  }

  const renderExpandToggle = () => {
    if (props.type === "Missing Collections") {
      return;
    }
    if (expanded) {
      return (
        <Col className="float-end collection-grouper-expand-toggle"><FontAwesomeIcon size="1x" icon={faAngleDown}/></Col>
      )
    } else {
      return (
        <Col className="float-end collection-grouper-expand-toggle"><FontAwesomeIcon size="1x" icon={faAngleRight}/></Col>
      );
    }
  }

  const renderCollectionName = () => {
    if (props.collection.properties.length > 0) {
      return (
        <Row onClick={toggleExpanded}>
          <Col xs={2}><h4>{props.collection.isStandardCollection ? "Standard" : props.collection.city}</h4></Col>
          <Col xs={3}><h4>{props.collection.name}</h4></Col>
          <Col xs={2}><h4>{formatNumberToUPXString(getBaseCollectionIncome())}</h4></Col>
          <Col xs={1}><FontAwesomeIcon size="2x" icon={faArrowRight}/></Col>
          <Col xs={2}><h4>{formatNumberToUPXString(props.collection.boost * getBaseCollectionIncome())}</h4></Col>
          {renderExpandToggle()}
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs={2}><h4>{props.collection.isStandardCollection ? "Standard" : props.collection.city}</h4></Col>
          <Col xs={3}><h4>{props.collection.name}</h4></Col>
        </Row>
      );
    }
  }

  const getCollectionColorClass = () => {
    switch(props.collection.category) {
      case "Standard":
        return "color-collection-standard collection-grouper-text-white ";
      case "Limited":
        return "color-collection-limited collection-grouper-text-white ";
      case "Exclusive":
        return "color-collection-exclusive collection-grouper-text-white ";
      case "Rare":
        return "color-collection-rare collection-grouper-text-white ";
      case "Ultra Rare":
        return "color-collection-ultrarare collection-grouper-text-white ";
      default:
        return "bg-dark";
    }
  }

  return (
    <div className={getCollectionColorClass()}>
      <Row className="bg-secondary collection-grouper-collection">
        <Col>
          {renderCollectionName()}
        </Col>
      </Row>
      {renderExpanded()}
    </div>
  );
}

export default connect(null, null)(OptimizerCollection);