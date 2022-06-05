import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Container, Row, Form, Button, Col } from 'react-bootstrap'
import UserProfile from '../../common/types/UserProfile';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import './UserProfile.css';
import WebCollection from '../../common/types/WebCollection';
import { faDownload, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nftCategoriesEnum } from '../../common/enums/nftCategoriesEnum';
import { KeyValuePair } from '../../common/types/KeyValuePair';
import WebNFTHistory from '../../common/types/WebNFTHistory';
import { profileViewOptions } from '../../common/enums/profileViewOptionsEnum';
import ProfileNFTFilters from '../../common/types/ProfileNFTFilters';
import ProfileSparkHistoryFilters from '../../common/types/ProfileSparkHistoryFilters';
import { BattleAssetTable } from '../BattleAssetTableComponent/BattleAssetTable';
import { useAppContext } from  '../../common/app-context';
import { ApiService } from '../../common/api';
import { getUserProfile } from '../../store/actions/profileActions';
import { getBattleHistory } from '../../store/actions/propertyActions';

interface OwnProps {
  userProfile: UserProfile,
  isLookup: boolean,
  hasError: boolean,
  filters: ProfilePropertyFilters,
  getUserByUsername: Function,
  updateFilters: Function,
  isLoading: boolean,
  collections: WebCollection[],
  getNFTHistory: Function,
  isLoadingHistory: boolean,
  nftHistory: WebNFTHistory[],
  hasLoadingHistoryError: boolean,
  closeNFTHistory: Function,
  historyDGoodId: number,
  getPropertyHistory: Function,
  updateSparkHistoryFilters: Function

  sparkHistoryFilters: ProfileSparkHistoryFilters,
  nftFilters: ProfileNFTFilters,
  updateView: Function,
  updateNFTFilters: Function,
  view: string,
  viewCategory: string,
  toggleImageModal: Function,
  trainAsset: Function,
  getUserProfile: Function,
  createBattle: Function,
  getBattleHistory: Function
};

export type UserProfileProps = OwnProps;

export const UserProfileComponent = (props: UserProfileProps) => {
  const context = useAppContext();
  const apiService: ApiService = context.apiService;

  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(false);
  const [uplandUsername, setUplandUsername] = useState('');

  useEffect(() => {
    if (!svg && props.userProfile.avatarUrl) {
      setLoading(true);
      fetch(props.userProfile.avatarUrl)
        .then(res => res.text())
        .then(text => { setSvg(text); setLoading(false); });
    }
  }, [props.userProfile.avatarLink, svg])

  const ResolveAllTrainings = async () => {
    await apiService.postResolveApprovedTrainings$().toPromise();
    props.getUserProfile();
  }

  const refreshBattlers = () => {
    props.getUserProfile();
  }

  const renderAvatar = () => {
    if (loading) {
      return (
        <div className="spinner"/>
      );
    } else if(!svg) {
      return (
        <div className="error"/>
      );
    }
  
    return (
      <div style={{backgroundColor: `Red`}} className="avatar-circle" dangerouslySetInnerHTML={{ __html: svg}}/>
    );
  }

  const renderInfoColumn = () => {
    if (!props.isLoading && !props.hasError && props.userProfile && props.userProfile.username && props.userProfile.username !== "" ) {
      return (
        <div className="profile-Username">
          <Row><h2>{props.userProfile.username}</h2></Row>
          <Row><h4>{props.userProfile.level}</h4></Row>
          <Row><h6>{props.userProfile.eosId}</h6></Row>
          <Row><h6>Battlers: {props.userProfile.battleAssets.length}</h6></Row>
          <Row><h6>Networth: {props.userProfile.networth.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} upx</h6></Row>
        </div>
      );
    } if (props.hasError) {
      return (
        <div className="profile-Username">
          <Row><h2>Could Not Find User {props.userProfile.username}</h2></Row>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }

  const renderDebugColumn = () => {
    if (!props.isLoading && !props.hasError && props.userProfile && props.userProfile.username && props.userProfile.username !== "" ) {
      return (
        <div className="profile-Username">
          <Row><Button onClick={ResolveAllTrainings}>Debug Finish All Trainings</Button></Row>
          <Row className="buttonPaddingTop5"><Button onClick={refreshBattlers}>Refresh Battlers</Button></Row>
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }


  const renderSelectedTable = () => {
    return <BattleAssetTable battleAssets={props.userProfile.battleAssets} toggleImageModal={props.toggleImageModal} trainAsset={props.trainAsset} createBattle={props.createBattle} getBattleHistory={props.getBattleHistory}/>;
  }


  return (
    <Container fluid={true} className="bg-secondary text-light">
      <Row className="profile-header">
        <div className="avatar-col">
          {renderAvatar()}
        </div>
        <div className="username-col">
          {renderInfoColumn()}
        </div>
        <div className="username-col">
          {renderDebugColumn()}
        </div>
      </Row>
      <Row>
        { renderSelectedTable() }
      </Row>
    </Container>
  );
}

export default connect(null, null)(UserProfileComponent);