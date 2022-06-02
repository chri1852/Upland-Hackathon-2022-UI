import './BattleAssetTable.css';
import { UserProfileProperty } from '../../common/types/UserProfile';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WebCollection from '../../common/types/WebCollection';
import Battle from '../../common/types/Battle';
import { BattleTableEntry } from './BattleTableEntry';

export interface OwnProps {
  battles: Battle[],
  joinBattle: Function
}

export const BattleTable = (props: OwnProps) => {
  return (
    <div className="bg-light battleAsset-table-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <div className="filter-col">
                <Form.Label>Battle Id</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Opponent Skills</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Upx Entry</Form.Label>
              </div>
            </th>
            <th>
              <Form.Label></Form.Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.battles
            .map((p) => <BattleTableEntry key={p.id} battle={p} joinBattle={props.joinBattle}/>)}
        </tbody>
      </Table>
    </div>
  );
}
