import React, { useEffect, useState, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closePropertyHistory } from '../../store/actions/propertyActions';
import { Row, Col, Button, Spinner, ModalTitle, ModalBody, ModalFooter, Modal, Form } from 'react-bootstrap'
import UIPropertyHistory from '../../common/types/UIPropertyHistory';
import './PropertyHistoryTableStyle.css'
import BattleAsset from '../../common/types/BattleAsset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common/api';
import { useAppContext } from  '../../common/app-context';

interface StateProps {
  isLoadingHistory: boolean,
  battleAsset: BattleAsset,
  hasLoadingHistoryError: boolean,
  loadingHistoryError: string,
  showModal: boolean
};

interface DispatchProps {
  closePropertyHistory: () => void;
}

export type PropertyHistoryProps = DispatchProps & StateProps;


const PropertyHistoryComponent = (props: PropertyHistoryProps) => {

  const [trainHours, setTrainHours] = useState(1);
  const [skillToTrain, setSkillToTrain] = useState("Rock");

  const context = useAppContext();
  const apiService: ApiService = context.apiService;

  const renderTrainFor = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Hours to Train <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={trainHours}
              onChange={e => {
                setTrainHours(parseInt(e.target.value));
            }}>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((c) => <option key={c} value={c}>{c}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderSkillToTrain = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Skill To Train <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={skillToTrain}
              onChange={e => {
                setSkillToTrain(e.target.value);
            }}>
              <option key={"Rock"} value={"Rock"}>Rock {props.battleAsset.rockSkill}</option>
              <option key={"Paper"} value={"Paper"}>Paper {props.battleAsset.paperSkill}</option>
              <option key={"Sissors"} value={"Sissors"}>Scissors {props.battleAsset.sissorsSkill}</option>
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const onClickTrain = async () => {
    await apiService.postTrainBattleAssetRequest$(props.battleAsset, skillToTrain, trainHours).toPromise();
    props.closePropertyHistory()
  }

  const renderHistoryModal = () => {
    if (props.hasLoadingHistoryError) {
      return (
        <Modal size="lg" show={props.hasLoadingHistoryError} onHide={() => props.closePropertyHistory()} animation={false} centered>
            <ModalTitle id="contained-modal-title-vcenter">Train {props.battleAsset.assetName}</ModalTitle>

            <ModalBody>
              Error Training Battle Asset
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={() => props.closePropertyHistory()}>Close</Button>
            </ModalFooter>
        </Modal>
      );
    } else if (props.showModal && props.battleAsset) {
      return (
        <Modal size="lg" show={props.battleAsset && !!props.battleAsset?.assetName} onHide={() => props.closePropertyHistory()} animation={false} centered>
            <ModalTitle className="history-title-pad">Train {props.battleAsset.assetName} {props.battleAsset.rockSkill} / {props.battleAsset.paperSkill} / {props.battleAsset.sissorsSkill}</ModalTitle>

            <ModalBody>
              <Col>
                <Row>{renderTrainFor()}</Row>
                <Row>{renderSkillToTrain()}</Row>
                <Row><h4>Fee: {trainHours * 25} upx</h4></Row>
              </Col>
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={onClickTrain}>Train</Button>
              <Button variant="primary" onClick={() => props.closePropertyHistory()}>Close</Button>
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
    closePropertyHistory: () => dispatch(closePropertyHistory())
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    isLoadingHistory: state.PropertyState.isLoadingHistory,
    battleAsset: state.PropertyState.battleAsset,
    hasLoadingHistoryError: state.PropertyState.hasLoadingHistoryError,
    showModal: state.PropertyState.showModal,
    loadingHistoryError: state.PropertyState.loadingHistoryError
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyHistoryComponent);