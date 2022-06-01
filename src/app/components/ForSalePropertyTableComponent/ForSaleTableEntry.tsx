import CachedForSaleProperty from '../../common/types/CachedForSaleProperty';
import WebCollection from '../../common/types/WebCollection';
import { CollectionSquare } from '../CollectionSquareComponent/CollectionSquareComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faList } from '@fortawesome/free-solid-svg-icons';

export interface OwnProps {
  property: CachedForSaleProperty,
  neighborhood?: string,
  collections: WebCollection[],
  getPropertyHistory: Function,
}

export const ForSaleTableEntry = (props: OwnProps) => {

  return (
    <tr>
      <td>{props.property.address}</td>
      <td>{!props.neighborhood ? "Unknown" : props.neighborhood}</td>
      <td>{props.property.size}</td>
      <td>{props.property.mint.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
      <td>{props.property.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {props.property.currency}</td>
      <td>{(props.property.markup*100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} %</td>
      <td>{props.property.owner}</td>
      <td>{props.collections.map((c) => <CollectionSquare key={c.id} collection={c} displayRight={false} />)}</td>
      <td>{props.property.building}</td>
      <td>
        <a className="nft-table-icon-padding">
          <FontAwesomeIcon icon={faList} onClick={() => props.getPropertyHistory(props.property.id)}/>
        </a>
        <a href={"https://play.upland.me/?prop_id=" + props.property.id} target="_blank" className="nft-table-icon-padding">
          <FontAwesomeIcon icon={faLink}/>
        </a>
      </td>
    </tr>
  );
}