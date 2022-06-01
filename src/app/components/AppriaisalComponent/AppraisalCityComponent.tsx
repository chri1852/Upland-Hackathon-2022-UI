import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col} from 'react-bootstrap';
import { AppraisalProperty } from '../../common/types/AppraisalResults';
import AppraisalPropertyComponent from './AppraisalPropertyComponent';
import './AppraisalComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WebCollection from '../../common/types/WebCollection';


interface OwnProps {
  properties: AppraisalProperty[],
  cityName: string,
  collections: WebCollection[]
}

export const AppraisalCityComponent = (props: OwnProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded =(event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  }

  const renderProperties = () => {
    if (expanded) {
      return (
        <>
          <AppraisalPropertyComponent key={"header" + props.cityName} property={{} as AppraisalProperty} isHeaderRow={true} collections={[]}/>
          {props.properties.map((p) => <AppraisalPropertyComponent key={p.address + p.city} property={p} isHeaderRow={false} collections={props.collections.filter((c) => p.collections.includes(c.id))}/>)}
        </>
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
  return (
    <div>
      <Row onClick={toggleExpanded} className="bg-dark collection-grouper">
        <Col><h2>{props.cityName}</h2></Col>
        <Col><h2>{props.properties.length}</h2></Col>
        <Col><h5>{props.properties.reduce((total, item) => { return total + item.lowerValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h5></Col>
        <Col><FontAwesomeIcon size="1x" icon={faArrowRight}/></Col>
        <Col><h5>{props.properties.reduce((total, item) => { return total + item.middleValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h5></Col>
        <Col><FontAwesomeIcon size="1x" icon={faArrowRight}/></Col>
        <Col><h5>{props.properties.reduce((total, item) => { return total + item.upperValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h5></Col>        
        {renderExpanded()}
      </Row>
      {renderProperties()}
    </div>
  );
}

export default connect(null, null)(AppraisalCityComponent);