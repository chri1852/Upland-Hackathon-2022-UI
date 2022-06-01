import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { OptimizerCollectionResult } from '../../common/types/OptimizerResults';
import { OptimizerCollection } from './OptimizerCollectionComponent';
import './OptimizerCollecitonGroup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


interface OwnProps {
  collectionGroup: OptimizerCollectionResult[],
  groupName: string
}

export const OptimizerCollectionGroupComponent = (props: OwnProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  }

  const renderCollections = () => {
    if (expanded) {
      return (
        props.collectionGroup.map((c) => <OptimizerCollection key={c.name + c.city} collection={c} type={props.groupName} />)
      );
    }
  }

  const renderExpanded = () => {
    if (expanded) {
      return (
        <Col className="collection-grouper-expand-toggle"><FontAwesomeIcon size="2x" icon={faAngleDown}/></Col>
      )
    } else {
      return (
        <Col className="collection-grouper-expand-toggle"><FontAwesomeIcon size="2x" icon={faAngleRight}/></Col>
      );
    }
  }

  const getToolTipText = () => {
    switch(props.groupName)
    {
      case "Optimized Collections":
        return "Collections you should slot with the indicated properties to get the maximum amount of UPX per month."
      case "Unfilled Collections":
        return "Collections you could fill, but the optimizer decided to slot their properties in different collections."
      case "Unoptimized Collections":
        return "Collections you have at least one property in, but don't have enough to fill."
      case "Extra Collections":
        return "Collections with extra properties after the optimizer has run. You can sell these without affecting your monthly upx.";
      case "Missing Collections":
        return "Collections you have no properties in."
    }
  }

  return (
    <div>
      <Row onClick={toggleExpanded} className="bg-dark collection-grouper">
        <Col><h2>{props.groupName}</h2></Col>
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              {getToolTipText()}
            </Tooltip>
          }
        >
          <Col><FontAwesomeIcon icon={faInfoCircle} /></Col>
        </OverlayTrigger>
        <Col><h2>{props.collectionGroup.length}</h2></Col>
        {renderExpanded()}
      </Row>
      {renderCollections()}
    </div>
  );
}

export default connect(null, null)(OptimizerCollectionGroupComponent);