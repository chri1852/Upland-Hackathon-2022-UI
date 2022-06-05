import './BattleAssetTable.css';
import { UserProfileProperty } from '../../common/types/UserProfile';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import { BattleAssetTableEntry } from './BattleAssetTableEntry';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import WebCollection from '../../common/types/WebCollection';
import BattleAsset from '../../common/types/BattleAsset';

export interface OwnProps {
  battleAssets: BattleAsset[],
  toggleImageModal: Function,
  trainAsset: Function,
  createBattle: Function,
  getBattleHistory: Function
}

export const BattleAssetTable = (props: OwnProps) => {
  return (
    <div className="bg-light battleAsset-table-min-width">
      <Table>
        <thead>
          <tr className="form-aligns">
            <th>
              <div className="filter-col">
                <Form.Label>Asset Id</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Battle Asset Id</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Category</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Name</Form.Label>
              </div>
            </th>
            <th>
              <div className="filter-col">
                <Form.Label>Rock / Paper / Scissors</Form.Label>
              </div>
            </th>
            <th>
              <Form.Label></Form.Label>
            </th>
            <th>
              <Form.Label></Form.Label>
            </th>
            <th>
              <Form.Label></Form.Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.battleAssets
            .map((p) => <BattleAssetTableEntry key={p.id} battleAsset={p} toggleImageModal={props.toggleImageModal} trainAsset={props.trainAsset} createBattle={props.createBattle} getBattleHistory={props.getBattleHistory}/>)}
        </tbody>
      </Table>
    </div>
  );
}
