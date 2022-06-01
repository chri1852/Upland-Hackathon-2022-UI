import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AppraisalProperty } from '../../common/types/AppraisalResults';
import './AppraisalComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AppraisalFigurePopupComponent } from './AppraisalFigurePopupComponent';
import WebCollection from '../../common/types/WebCollection';
import { CollectionSquare } from '../CollectionSquareComponent/CollectionSquareComponent';
import { useState } from 'react';

interface OwnProps {
  property: AppraisalProperty,
  isHeaderRow: boolean,
  collections: WebCollection[]
}

export const AppraisalPropertyComponent = (props: OwnProps) => {

  const [displayInfo, setDisplayInfo] = useState(false);

  const hoverHandler = () => {
    setDisplayInfo(true);
  }

  const outHandler = () => {
    setDisplayInfo(false);
  }

  const renderProperty = () => {
    if (props.isHeaderRow) {
      return (
        <Row>
            <OverlayTrigger
              key="right"
              placement="right"
              overlay={
                <Tooltip id={`tooltip-right`}>
                  {"Mouse over an address to get the figures used to calculate the appraisal"}
                </Tooltip>
              }
            >
              <Col><h6><FontAwesomeIcon icon={faInfoCircle} /> Address</h6></Col>
            </OverlayTrigger>
            <Col><h6>Mint</h6></Col>
            <Col><h6>Lower Value</h6></Col>
            <Col><h6>Middle Value</h6></Col>
            <Col><h6>Upper Value</h6></Col>
            <Col><h6>Notes</h6></Col>
          </Row>
      );
    }

    return (
      <Row>
        <Col className="appraisal-figure-display-wrapper" onMouseOver={hoverHandler} onMouseOut={outHandler}><h6>{props.property.address}</h6>
        <AppraisalFigurePopupComponent figures={props.property.figures} display={displayInfo}/>
        </Col>
        <Col><h6>{props.property.mint.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</h6></Col>
        <Col><h6>{formatNumberToUPXString(props.property.lowerValue)}</h6></Col>
        <Col><h6>{formatNumberToUPXString(props.property.middleValue)}</h6></Col>
        <Col><h6>{formatNumberToUPXString(props.property.upperValue)}</h6></Col>
        <Col><h6>{props.collections.map((c) => <CollectionSquare key={c.id} collection={c} displayRight={false}/>)} {props.property.note} </h6></Col>
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

export default connect(null, null)(AppraisalPropertyComponent);