import './PropertyTable.css';
import { UserProfileProperty } from '../../common/types/UserProfile';
import WebCollection from '../../common/types/WebCollection';
import { CollectionSquare } from '../CollectionSquareComponent/CollectionSquareComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faList } from '@fortawesome/free-solid-svg-icons';

export interface OwnProps {
  property: UserProfileProperty,
  collections: WebCollection[],
  getPropertyHistory: Function,
}

export const PropertyTableEntry = (props: OwnProps) => {

  return (
    <tr>
      <td>{props.property.address}</td>
      <td>{props.property.city}</td>
      <td>{props.property.neighborhood}</td>
      <td>{props.property.size}</td>
      <td>{props.property.mint.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
      <td>{props.property.boost > 1 ? props.property.boost: ''}</td>
      <td>{props.property.status}</td>
      <td>{props.collections.map((c) => <CollectionSquare key={c.id} collection={c} displayRight={false}/>)}</td>
      <td>{props.property.building}</td>
      <td>{props.property.minted ? "Minted" : "Bought"}</td>
      <td>{props.property.acquiredOn}</td>
      <td>
        <a className="nft-table-icon-padding">
          <FontAwesomeIcon icon={faList} onClick={() => props.getPropertyHistory(props.property.propertyId)}/>
        </a>
        <a href={"https://play.upland.me/?prop_id=" + props.property.propertyId} target="_blank" className="nft-table-icon-padding">
            <FontAwesomeIcon icon={faLink}/>
        </a>
      </td>
    </tr>
  );
}