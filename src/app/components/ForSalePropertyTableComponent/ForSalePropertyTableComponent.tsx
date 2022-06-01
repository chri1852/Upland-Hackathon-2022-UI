import { Table, Form } from 'react-bootstrap';
import { ForSaleTableEntry } from './ForSaleTableEntry';
import CachedForSaleProperty from '../../common/types/CachedForSaleProperty';
import WebNeighborhood from '../../common/types/WebNeighborhood';
import WebCollection from '../../common/types/WebCollection';
import '../../areas/forSaleProperties/forSaleProperties.css';

export interface OwnProps {
  properties: CachedForSaleProperty[],
  neighborhoods: WebNeighborhood[],
  collections: WebCollection[],
  getPropertyHistory: Function
}

export const ForSalePropertyTableComponent = (props: OwnProps) => {
  return (
    <div className="bg-light header-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <Form.Label>Address</Form.Label>
            </th>
            <th>
              <Form.Label>Neighborhood</Form.Label>
            </th>
            <th>
              <Form.Label>Size</Form.Label>
            </th>
            <th>
              <Form.Label>Mint</Form.Label>
            </th>
            <th>
             <Form.Label>Price</Form.Label>
            </th>
            <th>
              <Form.Label>Markup</Form.Label>
            </th>
            <th>
              <Form.Label>Owner</Form.Label>
            </th>
            <th>
              <Form.Label>Collections</Form.Label>
            </th>
            <th>
              <Form.Label>Building</Form.Label>
            </th>
            <th>
                <Form.Label></Form.Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.properties.map((p) => 
            <ForSaleTableEntry 
              key={p.address + p.cityId} 
              property={p} 
              neighborhood={props.neighborhoods.find(({ id }) => id === p.neighborhoodId)?.name} 
              collections={props.collections.filter((c) => p.collectionIds.includes(c.id))}
              getPropertyHistory={props.getPropertyHistory}
          />)}
        </tbody>
      </Table>
    </div>
  );
}
