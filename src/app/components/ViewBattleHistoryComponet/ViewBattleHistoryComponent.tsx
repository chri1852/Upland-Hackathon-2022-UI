import React, { useEffect, useState, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { closeBattleHistory } from '../../store/actions/propertyActions';
import { Row, Col, Button, Spinner, ModalTitle, ModalBody, ModalFooter, Modal, Table } from 'react-bootstrap'
import Battle from '../../common/types/Battle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../common/api';
import { useAppContext } from  '../../common/app-context';
import { getUserProfile } from '../../store/actions/profileActions';

interface StateProps {
  battleHistory: Battle[],
  showModal: boolean
};

interface DispatchProps {
  closeBattleHistory: () => void;
}

export type PropertyHistoryProps = DispatchProps & StateProps;


const BattleHistoryComponent = (props: PropertyHistoryProps) => {

  const renderHistoryModal = () => {
    if (props.showModal && props.battleHistory.length > 0) {
      return (
        <Modal size="lg" show={props.showModal} onHide={() => props.closeBattleHistory()} animation={false} centered>
            <ModalTitle className="history-title-pad">Battle History</ModalTitle>

            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Opponent</th>
                    <th>Skills</th>
                    <th>Challenger</th>
                    <th>Skills</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                {props.battleHistory.map((h) => 
                  <tr>
                    <td>{h.mustBattleBy}</td>
                    <td>{h.opponentBattleAssetId}</td>
                    <td>{h.opponentSkills}</td>
                    <td>{h.challengerBattleAssetId}</td>
                    <td>{h.challengerSkills}</td>
                    <td>{h.winnerBattleAssetId}</td>
                  </tr>)}
              </Table>
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={() => props.closeBattleHistory()}>Close</Button>
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
    closeBattleHistory: () => dispatch(closeBattleHistory()),
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    battleHistory: state.PropertyState.battleHistory,
    showModal: state.PropertyState.showBattleHistoryModal,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleHistoryComponent);