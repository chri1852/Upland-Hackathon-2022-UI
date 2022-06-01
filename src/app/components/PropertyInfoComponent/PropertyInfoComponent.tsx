import './PropertyInfoComponent.css';
import '../../common/styles/colors.css'
import WebCollection from '../../common/types/WebCollection';
import { Row, Col } from 'react-bootstrap';
import { CollectionSquare } from '../CollectionSquareComponent/CollectionSquareComponent';

export interface OwnProps {
  mint: string,
  city: string,
  collections: WebCollection[],
  show: boolean
}

export const PropertyInfoComponent = (props: OwnProps) => {

  const displayInfoBox = () => {
    if (props.show) {
      return "property-info-box-display bg-light";
    } else {
      return "info-box-no-display";
    }
  }

  return (
    <div className="info-box-wrapper">
      <div className={displayInfoBox()}>
        <Col>
          <Row>
            <b>{props.city}</b>
          </Row>
          <Row>
            <b>Mint - {props.mint}</b>
          </Row>
          <Row>
            {props.collections && props.collections.map((c) => <CollectionSquare key={c.id} collection={c} displayRight={false}/>)}
          </Row>
        </Col>
      </div>
    </div>
  );
}