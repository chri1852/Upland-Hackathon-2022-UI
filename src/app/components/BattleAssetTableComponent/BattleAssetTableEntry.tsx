import './BattleAssetTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faList } from '@fortawesome/free-solid-svg-icons';
import BattleAsset from '../../common/types/BattleAsset';
import { Container, Row, Form, Button, Col } from 'react-bootstrap'

export interface OwnProps {
  battleAsset: BattleAsset,
  trainAsset: Function,
  toggleImageModal: Function
}

export const BattleAssetTableEntry = (props: OwnProps) => {

  return (
    <tr>
      <td>{props.battleAsset.assetId}</td>
      <td>{props.battleAsset.assetCategory}</td>
      <td>{props.battleAsset.assetName}</td>
      <td>{props.battleAsset.rockSkill} / {props.battleAsset.paperSkill} / {props.battleAsset.sissorsSkill}</td>
      <td>{props.battleAsset.isTraining ? "In Training" : <Button onClick={() => props.trainAsset(props.battleAsset)}>Train</Button>}</td>
      <td>
        <a className="nft-table-icon-padding">
          <FontAwesomeIcon icon={faImage} onClick={() => props.toggleImageModal(props.battleAsset.thumbnail, props.battleAsset.assetName)}/>
        </a>
      </td>
    </tr>
  );
}