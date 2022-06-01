import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getUserRunCount } from '../../store/actions/profileActions';
import UserProfile from '../../common/types/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import './appraisal.css';
import { getLastAppraisal, postRunAppraisal } from '../../store/actions/appraisalActions';
import GetLastAppraisalRequest from '../../common/types/messages/GetLastAppraisalRequest';
import AppraisalResults from '../../common/types/AppraisalResults';
import PostRunAppraisalRequest from '../../common/types/messages/PostRunAppraisalRequest';
import GetRegisteredUserRunCountRequest from '../../common/types/messages/GetRegisteredUserRunCountRequest';
import { AppraisalCityComponent } from '../../components/AppriaisalComponent/AppraisalCityComponent';
import { useAppContext } from  '../../common/app-context';
import { ApiService } from '../../common/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import WebCollection from '../../common/types/WebCollection';

interface StateProps {
  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,

  hasError: boolean,
  errorMessage: string,

  appraisalResults: AppraisalResults,
  runFound: boolean,
  runRequested: boolean,

  notEnoughRuns: boolean,
  isLoadingAppraisal: boolean,

  isLoadingCollections: boolean,
  hasLoadingInfoError: boolean,
  infoErrorMessage: string,
  collections: WebCollection[]
};

interface DispatchProps {
  getUserRunCount: (request: GetRegisteredUserRunCountRequest) => void;
  getLastAppraisal: (request: GetLastAppraisalRequest) => void;
  postRunAppraisal: (request: PostRunAppraisalRequest) => void;
}

export type AppraisalProps = DispatchProps & StateProps;

export const Appraisal = (props: AppraisalProps) => {
  const navigate = useNavigate();
  const context = useAppContext();

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }

    if(props.isProfileLoaded && !props.runFound) {
      props.getLastAppraisal({ registeredUserId: props.userProfile.registeredUserId, fileType: "None" } as GetLastAppraisalRequest);
    }
  }, [navigate, props.authTokenSet]);

  const [isDownloadingFile, setIsDownloadingFile] = useState(false);

  const downloadCSV = async () => {

    setIsDownloadingFile(true);
    const apiService: ApiService = context.apiService;

    let filename = `${props.userProfile.username}_appraisal.csv`;

    const csvData = (await apiService.getLastAppraisal$({ registeredUserId: props.userProfile.registeredUserId, fileType: "csv" } as GetLastAppraisalRequest).toPromise()).response.stringResults;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // In case of IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } 
    setIsDownloadingFile(false);
  }

  const downloadTXT = async () => {

    setIsDownloadingFile(true);
    const apiService: ApiService = context.apiService;

    let filename = `${props.userProfile.username}_appraisal.txt`;

    const csvData = (await apiService.getLastAppraisal$({ registeredUserId: props.userProfile.registeredUserId, fileType: "txt" } as GetLastAppraisalRequest).toPromise()).response.stringResults;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // In case of IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } 
    setIsDownloadingFile(false);
  }

  const runAppraisal= () => {
    props.postRunAppraisal({ uplandUsername: props.userProfile.username} as PostRunAppraisalRequest);
  }

  const getLastAppraisal= () => {
    props.getLastAppraisal({ registeredUserId: props.userProfile.registeredUserId, fileType: "None" } as GetLastAppraisalRequest);
    props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
  }

  const runAppraisalDisabled = () => {
    return (props.isLoadingAppraisal) || (!props.userProfile.supporter && props.userProfile.runCount >= props.userProfile.maxRuns);
  }

  const displayAppraiserButtons = () => {
    return (
      <Row>
        <Col>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                This will run the Appraiser. It costs 1 run.
              </Tooltip>
            }
          >
            <Button variant="dark" onClick={runAppraisal} disabled={runAppraisalDisabled()}>Run Appraisal</Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                This will get your last Run, or status of the current run. It is a free action.
              </Tooltip>
            }
          >
            <Button variant="dark" onClick={getLastAppraisal}>Get Appraisal</Button>
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
          {displayAppraiserButtons()}
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
          {displayAppraiserButtons()}
        </div>
      );
    }
  }

  const formateDateString = (date: Date) => {
    let newDate = new Date(date);
    return (newDate.getUTCMonth() + 1) + "/" + newDate.getUTCDate() + "/" + newDate.getUTCFullYear() + " " + (("0" + newDate.getUTCHours()).slice(-2)) + ":" + (("0" + newDate.getUTCMinutes()).slice(-2)) + ":" + (("0" + newDate.getUTCSeconds()).slice(-2)) + " UTC";
  }

  const renderValuesCol = () => {
    if (props.runFound) {
      return (
        <div>
          <Row><h4>Valuations</h4></Row>
          <Row><h6>Lower Value: {props.appraisalResults.properties.reduce((total, item) => { return total + item.lowerValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
          <Row><h6>Middle Value: {props.appraisalResults.properties.reduce((total, item) => { return total + item.middleValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
          <Row><h6>Upper Value: {props.appraisalResults.properties.reduce((total, item) => { return total + item.upperValue }, 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
        </div>
      );
    } 
  }

  const renderInfoColumnData = () => {
    if (props.isLoadingAppraisal) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }else if (props.runFound) {
      return (
        <div>
          <Row><h6>Run On: {formateDateString(props.appraisalResults.runDateTime)}</h6></Row>
          <Row>
            <Col><Button className="for-sale-download-csv" variant="dark" onClick={downloadCSV} disabled={props.isLoadingAppraisal || isDownloadingFile}>CSV <FontAwesomeIcon icon={faDownload} /></Button></Col>
            <Col><Button className="for-sale-download-csv" variant="dark" onClick={downloadTXT} disabled={props.isLoadingAppraisal || isDownloadingFile}>TXT <FontAwesomeIcon icon={faDownload} /></Button></Col>
          </Row>
        </div>
      );
    } else if (!props.runFound) {
      return (
        <div>
          <Row><h3>No Runs Found</h3></Row>
        </div>
      );
    }
  }

  const renderInfoColumn = () => {
    return (
      <div className="info-column">
        <Row><h2>Profile Appraiser</h2></Row>
        {renderInfoColumnData()}
      </div>
    );
  }

  const renderAppraisalHeader = () => {
    return (
      <Container fluid={true} className="bg-secondary text-light">
        <Row className="profile-header">
          <div className="username-col">
            {renderInfoColumn()}
          </div>
          <div className="input-form-column header-info-column-width-300">
            {renderValuesCol()}
          </div>
          <div className="registered-user-col">
            {renderRegisterdUserCol()}
          </div>
        </Row>
      </Container>
    );
  }

  const renderAppraisalBody = () => {
    if(!props.isLoadingAppraisal && props.runFound) {
      return (
        <div>
          {Array.from(new Set(props.appraisalResults.properties.map(i => i.city)))
            .map((c) => 
              <AppraisalCityComponent 
                key={c} 
                cityName={c} 
                properties={props.appraisalResults.properties.filter(p => p.city === c)} 
                collections={props.collections}/>)}
        </div>
      );
    }
  }

  const renderAppraisal = () => {
    if (props.isLoadingProfile || props.isLoadingCollections) {
      return (
        <LoadingComponent />
      );
    } else if (props.hasError) {
      return (
        <ErrorComponent errorMessage={props.errorMessage} />
      );
    } else {
      return (
        <div className="appraisal-min-width">
          {renderAppraisalHeader()}
          {renderAppraisalBody()}
        </div>
      );
    }
  }

  return (
    <Container fluid={true} className="bg-secondary text-light">
      {renderAppraisal()}
    </Container>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    getUserRunCount: (request: GetRegisteredUserRunCountRequest) => dispatch(getUserRunCount(request)),
    getLastAppraisal: (request: GetLastAppraisalRequest) => dispatch(getLastAppraisal(request)),
    postRunAppraisal: (request: PostRunAppraisalRequest) => dispatch(postRunAppraisal(request))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    hasError: state.AppraisalState.hasError,
    errorMessage: state.AppraisalState.errorMessage,

    appraisalResults: state.AppraisalState.appraisalResults,
    runFound: state.AppraisalState.runFound,
    isLoadingAppraisal: state.AppraisalState.isLoadingAppraisal,

    runRequested: state.AppraisalState.runRequested,
    notEnoughRuns: state.AppraisalState.notEnoughRuns,

    isLoadingCollections: state.InfoState.isLoadingCollections,
    hasLoadingInfoError: state.InfoState.hasError,
    infoErrorMessage: state.InfoState.errorMessage,

    collections: state.InfoState.collections,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Appraisal);