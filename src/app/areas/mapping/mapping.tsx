import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Spinner, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getUserRunCount } from '../../store/actions/profileActions';
import UserProfile from '../../common/types/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import './mapping.css';
import { getMap, postCreateMap, updateMappingForm } from '../../store/actions/mappingActions';
import PostCreateMapRequest from '../../common/types/messages/PostCreateMapRequest';
import GetMapRequest from '../../common/types/messages/GetMapRequest';
import GetRegisteredUserRunCountRequest from '../../common/types/messages/GetRegisteredUserRunCountRequest';
import MappingForm from '../../common/types/MappingForm';
import { cities } from '../../common/enums/cityEnum';
import { mapTypes } from '../../common/enums/mappingTypesEnum';
import { mapKeys } from '../../common/enums/mappingKeyEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { TwitterPicker } from 'react-color';

interface StateProps {
  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,

  hasError: boolean,
  errorMessage: string,

  mapPath: string,
  mapFound: boolean,
  mapCreatedDateTime?: Date,

  notEnoughRuns: boolean,
  isLoadingMap: boolean,

  mappingForm: MappingForm
};

interface DispatchProps {
  getUserRunCount: (request: GetRegisteredUserRunCountRequest) => void;
  getMap: (request: GetMapRequest) => void;
  postCreateMap: (request: PostCreateMapRequest) => void;
  updateMapForm: (request: MappingForm) => void;
}

export type MappingProps = DispatchProps & StateProps;

export const Mapping = (props: MappingProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
  }, [navigate, props.authTokenSet]);

  const runCreateMap= () => {
    props.postCreateMap({ 
      username: props.userProfile.username,
      cityId: props.mappingForm.cityId,
      mapType: props.mappingForm.mapType,
      colorBlind: props.mappingForm.mapKeyType === 1,
      customColors: props.mappingForm.mapKeyType === 2 ? props.mappingForm.customColors : []
    });
    props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
  }

  const runGetMap= () => {
    props.getMap({ 
      registeredUserId: props.userProfile.registeredUserId, 
      mapType: props.mappingForm.mapType,
      cityId: props.mappingForm.cityId
     } as GetMapRequest);
    props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
  }

  const runCreateMapDisabled = () => {
    return (props.isLoadingMap) || (!props.userProfile.supporter && props.userProfile.runCount >= props.userProfile.maxRuns);
  }

  const displayMappingButtons = () => {
    return (
      <Row>
        <Col>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                This will create the map. It costs 1 run.
              </Tooltip>
            }
          >
            <Button variant="dark" onClick={runCreateMap} disabled={runCreateMapDisabled()}>Create Map</Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                This will get your last map of the selected type. It is a free action.
              </Tooltip>
            }
          >
            <Button variant="dark" onClick={runGetMap}>Get Last Map</Button>
          </OverlayTrigger>
        </Col>
      </Row>
    );
  }

  const renderRegisterdUserCol = () => {
    if (props.userProfile.supporter) {
      return (
        <div>
          <Row><h1>Supporter</h1></Row>
          <Row><h3>Thank You!</h3></Row>
          {displayMappingButtons()}
        </div>
      );
    } else {
      return (
        <div>
          {props.userProfile.runCount >= props.userProfile.maxRuns ? 
            <Row><u><b><h5>No Runs Left, Vist Locations</h5></b></u></Row> : 
            <Row><h5>Runs Used: {props.userProfile.runCount} / {props.userProfile.maxRuns}</h5></Row>}
          <Row><h5>UPX to Next Run: {props.userProfile.upxToNextRun}</h5></Row>
          <Row><h5>UPX to Supporter: {props.userProfile.upxToSupporter}</h5></Row>
          {displayMappingButtons()}
        </div>
      );
    }
  }

  const formateDateString = (date: Date) => {
    let newDate = new Date(date);
    return (newDate.getUTCMonth() + 1) + "/" + newDate.getUTCDate() + "/" + newDate.getUTCFullYear() + " " + (("0" + newDate.getUTCHours()).slice(-2)) + ":" + (("0" + newDate.getUTCMinutes()).slice(-2)) + ":" + (("0" + newDate.getUTCSeconds()).slice(-2)) + " UTC";
  }

  const renderInfoColumnData = () => {
    if (props.isLoadingMap) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }else if (props.mapFound) {
      return (
        <div>
        <p className="mapping-center-text"><h5>Created</h5></p>
        <p className="mapping-center-text">{formateDateString(props.mapCreatedDateTime!)}</p>
        </div>
      );
    } else if (!props.mapFound) {
      return (
        <Row><h3>No Map Found</h3></Row>
      );
    }
  }

  const renderCitySelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>City <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.mappingForm.cityId}
              onChange={e => {
                props.updateMapForm({
                  ...props.mappingForm,
                  cityId: parseInt(e.target.value),
                });
            }}>
              {cities.map((c) => <option value={c.key}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderMapTypeSelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Map Type <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.mappingForm.mapType}
              onChange={e => {
                props.updateMapForm({
                  ...props.mappingForm,
                  mapType: e.target.value,
                });
            }}>
              {mapTypes.map((c) => <option value={c.key}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderMapKeySelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Key Type <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.mappingForm.mapKeyType}
              onChange={e => {
                props.updateMapForm({
                  ...props.mappingForm,
                  mapKeyType: parseInt(e.target.value),
                });
            }}>
              {mapKeys.map((c) => <option value={c.key}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const renderInfoColumn = () => {
    return (
      <div className="info-column">
        <Row className="mapping-center-text"><h2>Mapping</h2></Row>
        {renderInfoColumnData()}
      </div>
    );
  }

  const renderColumnTwo = () => {
    return (
      <div>
        {renderCitySelect()}
        {renderMapTypeSelect()}
        {renderMapKeySelect()}
      </div>
    );
  }

  const updateCustomerColors = (color: any, event: any) => {
    var newIndex = props.mappingForm.customColors.findIndex(e => e === color.hex);

    if (newIndex !== -1) {
      props.updateMapForm({
        ...props.mappingForm, 
        activeColor: color.hex
      });
    } else {
      var index = props.mappingForm.customColors.findIndex(e => e === props.mappingForm.activeColor);
      var newColors = props.mappingForm.customColors;
      newColors.splice(index, 1, color.hex);

      props.updateMapForm({
        ...props.mappingForm, 
        customColors: newColors,
        activeColor: color.hex
      });
    }
  }

  const renderColumnThree = () => {
    if (props.mappingForm.mapKeyType === 2) {
      return (
        <div>
          <TwitterPicker 
            color={props.mappingForm.activeColor}
            triangle='hide'
            width='310px'
            colors={props.mappingForm.customColors}
            onChangeComplete={updateCustomerColors}
          />
          <Row className="mapping-center-text"><p>*The last four squares use white instead of black text</p></Row>
        </div>
      );
    }
  }

  const renderMappingHeader = () => {
    return (
      <Container fluid={true} className="bg-secondary text-light">
        <Row className="profile-header">
          <Col className="header-info-column-width-250">
            {renderInfoColumn()}
          </Col>
          <Col className="input-form-column header-info-column-width-350">
            {renderColumnTwo()}
          </Col>
          <Col className="input-form-column header-info-column-width-350">
            {renderColumnThree()}
          </Col>
          <Col className="registered-user-col header-info-column-width-350">
            {renderRegisterdUserCol()}
          </Col>
        </Row>
      </Container>
    );
  }

  const renderMappingBody = () => {
    if(!props.isLoadingMap && props.mapFound) {
      return (
        <div className="mapping-map-margin">
          <img className="mapping-map-size" src={props.mapPath.replace(/\//g, '/')} alt="Failed Loading" />
        </div>
      );
    }
  }

  const renderMapping = () => {
    if (props.isLoadingProfile) {
      return (
        <LoadingComponent />
      );
    } else if (props.hasError) {
      return (
        <ErrorComponent errorMessage={props.errorMessage} />
      );
    } else {
      return (
        <div className="mapping-min-width">
          {renderMappingHeader()}
          {renderMappingBody()}
        </div>
      );
    }
  }

  return (
    <Container fluid={true} className="bg-secondary text-light">
      {renderMapping()}
    </Container>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    getUserRunCount: (request: GetRegisteredUserRunCountRequest) => dispatch(getUserRunCount(request)),
    getMap: (request: GetMapRequest) => dispatch(getMap(request)),
    postCreateMap: (request: PostCreateMapRequest) => dispatch(postCreateMap(request)),
    updateMapForm: (mappingForm: MappingForm) => dispatch(updateMappingForm(mappingForm))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,

    hasError: state.MappingState.hasError,
    errorMessage: state.MappingState.errorMessage,

    mapPath: state.MappingState.mapFilePath,
    mapFound: state.MappingState.mapFound,
    mapCreatedDateTime: state.MappingState.mapCreationDateTime,

    notEnoughRuns: state.MappingState.notEnoughRuns,
    isLoadingMap: state.MappingState.isLoadingMap,

    mappingForm: state.MappingState.mappingForm
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Mapping);