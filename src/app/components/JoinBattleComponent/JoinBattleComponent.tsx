import React, { useEffect, useState, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closeJoinBattle } from '../../store/actions/propertyActions';
import { Row, Col, Button, Spinner, ModalTitle, ModalBody, ModalFooter, Modal, Form } from 'react-bootstrap'
import BattleAsset from '../../common/types/BattleAsset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common/api';
import { useAppContext } from  '../../common/app-context';
import { getUserProfile } from '../../store/actions/profileActions';

interface StateProps {
  battleId: number,
  battleAssets: BattleAsset[]
  showModal: boolean
};

interface DispatchProps {
  closeJoinBattle: () => void;
  getUserProfile: () => void;
}

export type PropertyHistoryProps = DispatchProps & StateProps;


const JoinBattleComponent = (props: PropertyHistoryProps) => {

  const [battleAssetId, setBattleAssetId] = useState(0);

  const context = useAppContext();
  const apiService: ApiService = context.apiService;

  const renderEnterWager = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Battle With <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
          <Form.Control type="dropdown" as="select" value={battleAssetId}
              onChange={e => {
                setBattleAssetId(parseInt(e.target.value));
            }}>
              {props.battleAssets
                .filter((c) => !c.isBattling && !c.isTraining)
                .map((c) => <option key={c.id} value={c.id}>{c.assetName} {c.rockSkill} / {c.paperSkill} / {c.sissorsSkill}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const onClickBattle = async () => {
    await apiService.postJoinBattle$(props.battleAssets.filter((c) => !c.isBattling && !c.isTraining)[0], props.battleId).toPromise();
    props.closeJoinBattle();
    props.getUserProfile();
  }

  const renderHistoryModal = () => {
    if (props.showModal) {
      return (
        <Modal size="lg" show={props.battleAssets && props.battleAssets.length > 0} onHide={() => props.closeJoinBattle()} animation={false} centered>
            <ModalTitle className="history-title-pad">Join Battle {props.battleId}</ModalTitle>

            <ModalBody>
              <Col>
                <Row>{renderEnterWager()}</Row>
              </Col>
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={onClickBattle}>Join Battle</Button>
              <Button variant="primary" onClick={() => props.closeJoinBattle()}>Close</Button>
            </ModalFooter>
        </Modal>
      );
    }
  }


  return (
    <>
      {renderHistoryModal()}
    </>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    closeJoinBattle: () => dispatch(closeJoinBattle()),
    getUserProfile: () => dispatch(getUserProfile())
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    battleAssets: state.ProfileState.userProfile.battleAssets,
    showModal: state.PropertyState.showJoinBattleModal,
    battleId: state.PropertyState.joinBattleId
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinBattleComponent);