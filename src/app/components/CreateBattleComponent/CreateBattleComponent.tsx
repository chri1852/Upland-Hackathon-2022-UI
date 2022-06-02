import React, { useEffect, useState, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closeCreateBattle } from '../../store/actions/propertyActions';
import { Row, Col, Button, Spinner, ModalTitle, ModalBody, ModalFooter, Modal, Form } from 'react-bootstrap'
import BattleAsset from '../../common/types/BattleAsset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common/api';
import { useAppContext } from  '../../common/app-context';
import { getUserProfile } from '../../store/actions/profileActions';

interface StateProps {
  battleAsset: BattleAsset,
  showModal: boolean
};

interface DispatchProps {
  closeCreateBattle: () => void;
  getUserProfile: () => void;
}

export type PropertyHistoryProps = DispatchProps & StateProps;


const CreateBattleComponent = (props: PropertyHistoryProps) => {

  const [upxToWager, setUpxToWager] = useState(500);

  const context = useAppContext();
  const apiService: ApiService = context.apiService;

  const renderEnterWager = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Wager <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="text" value={upxToWager} onChange={e => {
                setUpxToWager(parseInt(e.target.value));
            }} />
          </Col>
        </Row>
      </div>
    )
  }

  const onClickBattle = async () => {
    await apiService.postCreateBattleRequest$(props.battleAsset, upxToWager).toPromise();
    props.closeCreateBattle();
    props.getUserProfile();
  }

  const renderHistoryModal = () => {
    if (props.showModal && props.battleAsset) {
      return (
        <Modal size="lg" show={props.battleAsset && !!props.battleAsset?.assetName} onHide={() => props.closeCreateBattle()} animation={false} centered>
            <ModalTitle className="history-title-pad">Battle {props.battleAsset.assetName} {props.battleAsset.rockSkill} / {props.battleAsset.paperSkill} / {props.battleAsset.sissorsSkill}</ModalTitle>

            <ModalBody>
              <Col>
                <Row>{renderEnterWager()}</Row>
              </Col>
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={onClickBattle}>Battle</Button>
              <Button variant="primary" onClick={() => props.closeCreateBattle()}>Close</Button>
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
    closeCreateBattle: () => dispatch(closeCreateBattle()),
    getUserProfile: () => dispatch(getUserProfile())
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    battleAsset: state.PropertyState.battleBattleAsset,
    showModal: state.PropertyState.showBattleModal,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBattleComponent);