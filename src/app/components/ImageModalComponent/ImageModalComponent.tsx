import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { toggleImageModal } from '../../store/actions/nftActions';
import { Button, ModalTitle, ModalBody, ModalFooter, Modal } from 'react-bootstrap'

interface StateProps {
  imageUrl: string,
  imageName: string
};

interface DispatchProps {
  toggleImageModal: (url: string, imageName: string) => void;
};

export type PropertyHistoryProps = DispatchProps & StateProps;


const ImageModalComponent = (props: PropertyHistoryProps) => {

  const renderHistoryModal = () => {
    if (props.imageUrl && props.imageUrl !== '') {
      return (
        <Modal show={!!props.imageUrl && props.imageUrl !== ''} onHide={() => props.toggleImageModal('', '')} animation={false} centered>
            <ModalTitle className="history-title-pad">{props.imageName}</ModalTitle>

            <ModalBody>
              <img src={props.imageUrl} className="img-fluid" /> 
            </ModalBody>

            <ModalFooter>
              <Button variant="primary" onClick={() => props.toggleImageModal('', '')}>Close</Button>
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
    toggleImageModal: (url: string, imageName: string) => dispatch(toggleImageModal(url, imageName))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    imageUrl: state.NFTState.nftUrl,
    imageName: state.NFTState.nftImageName
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageModalComponent);