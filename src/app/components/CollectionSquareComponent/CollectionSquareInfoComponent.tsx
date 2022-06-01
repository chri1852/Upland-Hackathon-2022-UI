import './CollectionSquareComponent.css';
import '../../common/styles/colors.css'
import WebCollection from '../../common/types/WebCollection';
import { Row, Col } from 'react-bootstrap';

export interface OwnProps {
  collection: WebCollection,
  displayRight: boolean,
  displayInfo: boolean
}

export const CollectionSquareInfo = (props: OwnProps) => {

  const displayInfoBox = () => {
    if (props.displayInfo) {
      return `${props.displayRight ? 'info-box-display-right' : 'info-box-display-left'} info-box-display `;
    } else {
      return "info-box-no-display";
    }
  }

  const getBackgroundColor = () => {
    if (!props || !props.collection || !props.collection.category) {
      return "";
    }
    
    switch(props.collection.category) {
      case 1:
        return "color-collection-standard";
      case 2:
        return "color-collection-limited";
      case 3:
        return "color-collection-exclusive";
      case 4:
        return "color-collection-rare";
      case 5:
        return "color-collection-ultrarare";
      default:
        return "";
    }
  }
  
  return (
    <div className={getBackgroundColor() + " " + displayInfoBox()}>
      <Col>
        <Row>
          <b>{props.collection.categoryString} - {props.collection.name}</b>
        </Row>
        <Row>
          <b>Props: {props.collection.numberOfProperties}, Boost: {props.collection.boost}, Reward: {props.collection.reward.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b>
        </Row>
        <Row>
          <p>{props.collection.description}</p>
        </Row>
      </Col>
    </div>
  );
}