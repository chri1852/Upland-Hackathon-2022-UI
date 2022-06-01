import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import './header.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../store/actions/profileActions';
import { getCollections, getNeighborhoods, getStreets, getBlockchainStatus, getAnnouncements } from '../../store/actions/infoActions';
import { logout } from '../../store/actions/loginActions';

interface StateProps {
  authTokenSet: boolean
  isProfileLoaded: boolean,
  isLoadingProfile: boolean,
  isLoadingCollections: boolean,
  isLoadingNeighborhoods: boolean,
  collectionsLoaded: boolean,
  neighborhoodsLoaded: boolean,
  hasLoadingInfoError: boolean,
  hasLoadingProfileError: boolean,
  errorMessage: string,
  isBlockchainDisabled: boolean,
  hasAnnouncement: boolean,
  announcement: string
};

interface DispatchProps {
  getUserProfile: () => void;
  getCollections: () => void;
  getNeighborhoods: () => void;
  getStreets: () => void;
  logout: () => void;
  getBlockchainStatus: () => void;
  getAnnouncements: () => void;
}

export type HeaderProps = StateProps & DispatchProps;

export const Header = (props: HeaderProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(props.authTokenSet) { 
      if(!props.isProfileLoaded && !props.isLoadingProfile) {
        props.getUserProfile();
      }
    }
  }, [navigate, props.isProfileLoaded, props.authTokenSet, props.collectionsLoaded, props.neighborhoodsLoaded])

  const navigateToLink = (link: string) => {
    navigate(link);
  }

  const performLogout = () => {
    props.logout();
    navigateToLink('./');
  }


  const renderLoggedInValues = () => {
    if (props.authTokenSet) {
      return (
        <Nav className="navbar-right">
          <Nav.Link className="nav-spacing" onClick={() => navigateToLink('./Manage')}>Manage Battlers</Nav.Link>
          <Nav.Link className="nav-spacing" onClick={() => navigateToLink('./Battle')}>Battle</Nav.Link>
          <Nav.Link className="nav-spacing" onClick={performLogout}>Logout</Nav.Link>
        </Nav>
      );
    } else {
      return;
    }
  }

  const renderBlockchainError = () => {
    if (props.isBlockchainDisabled) {
      return (
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              Blockchain Updating is Disabled! This data may be out of date.
            </Tooltip>
          }
        >
          <Navbar.Brand>
            <FontAwesomeIcon className="text-danger" icon={faExclamationTriangle}/>
          </Navbar.Brand>
        </OverlayTrigger>
      );
    }
  }

  const renderAnnouncements = () => {
    if (props.hasAnnouncement) {
      return (
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-bottom`} className="header-info-tooltip">
              <div dangerouslySetInnerHTML={{ __html: props.announcement }}></div>
            </Tooltip>
          }
        >
          <Navbar.Brand>
            <FontAwesomeIcon className="text-info" icon={faInfoCircle}/>
          </Navbar.Brand>
        </OverlayTrigger>
      );
    }
  }

  return (
    <Navbar className="navbar-dark bg-dark navbar-min-width" fixed="top">
      <Container fluid>
        <Nav className="nav-spacing">
          {renderLoggedInValues()}
        </Nav>
        <Nav className="navbar-right nav-spacing">
          {renderAnnouncements()}
          {renderBlockchainError()}
          <Navbar.Brand>
            GJS Hackathon 2022
          </Navbar.Brand>
        </Nav>
      </Container>
    </Navbar>
  )
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    getUserProfile: () => dispatch(getUserProfile()),
    getCollections: () => dispatch(getCollections()),
    getNeighborhoods: () => dispatch(getNeighborhoods()),
    getStreets: () => dispatch(getStreets()),
    logout: () => dispatch(logout()),
    getBlockchainStatus: () => dispatch(getBlockchainStatus()),
    getAnnouncements: () => dispatch(getAnnouncements())
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    isLoadingCollections: state.InfoState.isLoadingCollections,
    isLoadingNeighborhoods: state.InfoState.isLoadingNeighborhoods,
    collectionsLoaded: state.InfoState.collections.length > 0,
    neighborhoodsLoaded: state.InfoState.neighborhoods.length > 0,
    hasLoadingInfoError: state.InfoState.hasError,
    hasLoadingProfileError: state.ProfileState.hasError,
    errorMessage: state.ProfileState.errorMessage + " " + state.InfoState.errorMessage,
    isBlockchainDisabled: state.InfoState.isBlockchainDisabled,
    hasAnnouncement: state.InfoState.hasAnnouncement,
    announcement: state.InfoState.announcement
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
