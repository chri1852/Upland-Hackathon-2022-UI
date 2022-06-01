import React, { useEffect, useState, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Spinner, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getUserRunCount } from '../../store/actions/profileActions';
import UserProfile from '../../common/types/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import './optimizer.css';
import { getLastOptimizerRun, postOptimizerRun, updateOptimizerForm } from '../../store/actions/optimizerActions';
import GetLastOptimizerRunRequest from '../../common/types/messages/GetLastOptimizerRunRequest';
import OptimizerResults from '../../common/types/OptimizerResults';
import PostOptimizerRunRequest from '../../common/types/messages/PostOptimizerRunRequest';
import { OptimizerCollectionGroupComponent } from '../../components/OptimizerCollectionComponents/OptimizerCollectionGroupComponent';
import GetRegisteredUserRunCountRequest from '../../common/types/messages/GetRegisteredUserRunCountRequest';
import { useAppContext } from  '../../common/app-context';
import { ApiService } from '../../common/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { optimizerSortBy } from '../../common/enums/optimizerSortByEnum';

interface StateProps {
  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,
  hasError: boolean,
  errorMessage: string,

  optimizerResults: OptimizerResults,
  runFound: boolean,
  runCompleted: boolean,
  runFailed: boolean,
  runRequested: boolean,
  notEnoughRuns: boolean,
  isLoadingOptimization: boolean,

  sortBy: string
};

interface DispatchProps {
  getUserRunCount: (request: GetRegisteredUserRunCountRequest) => void;
  getLastOptimizerRun: (request: GetLastOptimizerRunRequest) => void;
  postOptimizerRun: (request: PostOptimizerRunRequest) => void;
  updateOptimzerForm: (sortBy: string) => void;
}

export type OptimizerProps = DispatchProps & StateProps;

export const Optimizer = (props: OptimizerProps) => {
  const navigate = useNavigate();
  const context = useAppContext();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
  }, [navigate]);

  useEffect(() => {
    if(props.isProfileLoaded) {
      props.getLastOptimizerRun({ registeredUserId: props.userProfile.registeredUserId, sortBy: props.sortBy, fileType: "None" } as GetLastOptimizerRunRequest);
      props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
    } else if(props.isProfileLoaded && !props.runFound) {
      props.getLastOptimizerRun({ registeredUserId: props.userProfile.registeredUserId, sortBy: props.sortBy, fileType: "None" } as GetLastOptimizerRunRequest);
      props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
    }
  }, [navigate, props.isProfileLoaded, props.sortBy]);

  useEffect(() => {
    if (props.runRequested) {
      intervalRef.current = setInterval(() => {
        if (props.isProfileLoaded && !props.isLoadingOptimization && !props.errorMessage && !props.runCompleted && !props.runFailed)
        {
          props.getLastOptimizerRun({ registeredUserId: props.userProfile.registeredUserId, sortBy: props.sortBy, fileType: "None" } as GetLastOptimizerRunRequest);
        }
      }, 5000);
    } else if (props.runCompleted || props.runFailed) {
      clearInterval(intervalRef.current!);
      props.getUserRunCount({ uplandUsername: props.userProfile.username } as GetRegisteredUserRunCountRequest);
    }
  }, [props.runRequested, props.runCompleted, props.runFailed]);

  const [isDownloadingFile, setIsDownloadingFile] = useState(false);
  
  const downloadCSV = async () => {

    setIsDownloadingFile(true);
    const apiService: ApiService = context.apiService;

    let filename = `${props.userProfile.username}_optimizationResults.csv`;

    const csvData = (await apiService.getLastOptimizerRun$({ registeredUserId: props.userProfile.registeredUserId, fileType: "csv" } as GetLastOptimizerRunRequest).toPromise()).response.stringResults;

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

    let filename = `${props.userProfile.username}_optimizationResults.txt`;

    const csvData = (await apiService.getLastOptimizerRun$({ registeredUserId: props.userProfile.registeredUserId, fileType: "txt" } as GetLastOptimizerRunRequest).toPromise()).response.stringResults;

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

  const runOptimization = () => {
    props.postOptimizerRun({username: props.userProfile.username} as PostOptimizerRunRequest);
  }

  const runOptimizationDisabled = () => {
    return props.isLoadingOptimization || (props.runFound && !props.runCompleted && !props.runFailed) || (!props.userProfile.supporter && props.userProfile.runCount >= props.userProfile.maxRuns);
  }

  const renderOrderBySelect = () => {
    return (
      <div className="input-form-column-item">
        <Row>
          <Col xs={5}>
            <h5>Order By <FontAwesomeIcon icon={faCaretDown} /></h5>
          </Col>
          <Col>
            <Form.Control type="dropdown" as="select" value={props.sortBy} disabled={runOptimizationDisabled()}
              onChange={e => {
                props.updateOptimzerForm(e.target.value);
            }}>
              {optimizerSortBy.map((c) => <option key={c.key} value={c.value}>{c.value}</option>)}
            </Form.Control>
          </Col>
        </Row>
      </div>
    )
  }

  const displayOptimizerButtons = () => {
    return (
      <Row>
        <Col>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                This will run the Optimizer. It costs 1 run.
              </Tooltip>
            }
          >
            <Button variant="dark" onClick={runOptimization} disabled={runOptimizationDisabled()}>Run Optimization</Button>
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
          {displayOptimizerButtons()}
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
          {displayOptimizerButtons()}
        </div>
      );
    }
  }

  const formateDateString = (date: Date) => {
    let newDate = new Date(date);
    return (newDate.getUTCMonth() + 1) + "/" + newDate.getUTCDate() + "/" + newDate.getUTCFullYear() + " " + (("0" + newDate.getUTCHours()).slice(-2)) + ":" + (("0" + newDate.getUTCMinutes()).slice(-2)) + ":" + (("0" + newDate.getUTCSeconds()).slice(-2)) + " UTC";
  }

  const renderInfoColumnData = () => {
    if (props.isLoadingOptimization) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }else if (props.runFound && props.runCompleted) {
      return (
        <div>
          <Row><h6>Run On: {formateDateString(props.optimizerResults.runDateTime)}</h6></Row>
          <Row><h6>Base Earnings: {props.optimizerResults.baseTotalIncome.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
          <Row><h6>Boosted Earnings: {props.optimizerResults.boostedTotalIncome.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
          <Row>
            <Col><Button className="for-sale-download-csv" variant="dark" onClick={downloadCSV} disabled={props.isLoadingOptimization || isDownloadingFile}>CSV <FontAwesomeIcon icon={faDownload} /></Button></Col>
            <Col><Button className="for-sale-download-csv" variant="dark" onClick={downloadTXT} disabled={props.isLoadingOptimization || isDownloadingFile}>TXT <FontAwesomeIcon icon={faDownload} /></Button></Col>
          </Row>
        </div>
      );
    } else if (props.runFound && !props.runCompleted && !props.runFailed) {
      return (
        <div>
          <Row><h3>Running...</h3></Row>
        </div>
      );
    } else if (props.runFound && !props.runCompleted && props.runFailed) {
      return (
        <div>
          <Row><h3>Run Failed</h3></Row>
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
        <Row><h2>Collection Optimizer</h2></Row>
        {renderInfoColumnData()}
      </div>
    );
  }

  const renderColumnTwo = () => {
    return (
      <div className="info-column">
        {renderOrderBySelect()}
      </div>
    );
  }

  const renderOptimizerHeader = () => {
    return (
      <Container fluid={true} className="bg-secondary text-light">
        <Row className="profile-header header-min-width">
          <Col className="input-form-column-one input-form-column header-info-column-width-350">
            {renderInfoColumn()}
          </Col>
          <Col className="input-form-column header-info-column-width-350">
            {renderColumnTwo()}
          </Col>
          <Col className="registered-user-col header-info-column-width-350">
            {renderRegisterdUserCol()}
          </Col>
        </Row>
      </Container>
    );
  }

  const renderOptimizerBody = () => {
    if(!props.isLoadingOptimization && props.runFound && props.runCompleted) {
      return (
        <div>
          {props.optimizerResults.optimizedCollections.length > 0 ? <OptimizerCollectionGroupComponent groupName="Optimized Collections" collectionGroup={props.optimizerResults.optimizedCollections} /> : null }
          {props.optimizerResults.unfilledCollections.length > 0 ? <OptimizerCollectionGroupComponent groupName="Unfilled Collections" collectionGroup={props.optimizerResults.unfilledCollections} /> : null }
          {props.optimizerResults.unoptimizedCollections.length > 0 ? <OptimizerCollectionGroupComponent groupName="Unoptimized Collections" collectionGroup={props.optimizerResults.unoptimizedCollections} /> : null }
          {props.optimizerResults.extraCollections.length > 0 ? <OptimizerCollectionGroupComponent groupName="Extra Collections" collectionGroup={props.optimizerResults.extraCollections} /> : null }
          {props.optimizerResults.missingCollections.length > 0 ? <OptimizerCollectionGroupComponent groupName="Missing Collections" collectionGroup={props.optimizerResults.missingCollections} /> : null }
        </div>
      );
    }
  }

  const renderOptimizer = () => {
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
        <div className="optimizer-min-width">
          {renderOptimizerHeader()}
          {renderOptimizerBody()}
        </div>
      );
    }
  }

  return (
    <Container fluid={true} className="bg-secondary text-light">
      {renderOptimizer()}
    </Container>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    getUserRunCount: (request: GetRegisteredUserRunCountRequest) => dispatch(getUserRunCount(request)),
    getLastOptimizerRun: (request: GetLastOptimizerRunRequest) => dispatch(getLastOptimizerRun(request)),
    postOptimizerRun: (request: PostOptimizerRunRequest) => dispatch(postOptimizerRun(request)),
    updateOptimzerForm: (sortBy: string) => dispatch(updateOptimizerForm(sortBy))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    hasError: state.ProfileState.hasError,
    errorMessage: state.OptimizerState.errorMessage,

    optimizerResults: state.OptimizerState.optimizerResults,
    runFound: state.OptimizerState.runFound,
    runCompleted: state.OptimizerState.runCompleted,
    runFailed: state.OptimizerState.runFailed,
    isLoadingOptimization: state.OptimizerState.isLoadingOptimization,

    runRequested: state.OptimizerState.runRequested,
    notEnoughRuns: state.OptimizerState.notEnoughRuns,

    sortBy: state.OptimizerState.sortBy
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Optimizer);