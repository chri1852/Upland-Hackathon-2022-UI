import './BattleAssetTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faList } from '@fortawesome/free-solid-svg-icons';
import Battle from '../../common/types/Battle';
import { Container, Row, Form, Button, Col } from 'react-bootstrap'

export interface OwnProps {
  battle: Battle,
  joinBattle: Function
}

export const BattleTableEntry = (props: OwnProps) => {

  return (
    <tr>
      <td>{props.battle.id}</td>
      <td>{props.battle.opponentSkills}</td>
      <td>{props.battle.upxPerSide}</td>
      <td><Button onClick={() => props.joinBattle(props.battle.id)}>Join Battle</Button></td>
    </tr>
  );
}