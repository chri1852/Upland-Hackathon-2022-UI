import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { updateLoggedInFilters, updateLoggedInNFTFilters, updateLoggedInView, updateLoggedInSparkHistoryFilters, getUserProfile } from '../../store/actions/profileActions';
import UserProfile from '../../common/types/UserProfile';
import { UserProfileComponent } from '../../components/UserProfileComponent/UserProfile';
import { LoadingComponent } from '../../components/LoadingComponent/Loading';
import { ErrorComponent } from '../../components/ErrorComponent/Error';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import WebCollection from '../../common/types/WebCollection';
import { getNFTHistory, closeNFTHistory, toggleImageModal } from '../../store/actions/nftActions';
import { getPropertyHistory, createBattle } from '../../store/actions/propertyActions';
import WebNFTHistory from '../../common/types/WebNFTHistory';
import './profile.css';
import PropertyHistoryComponent from '../../components/PropertyHistoryComponent/PropertyHistoryComponent';
import ImageModalComponent from '../../components/ImageModalComponent/ImageModalComponent';
import ProfileNFTFilters from '../../common/types/ProfileNFTFilters';
import ProfileSparkHistoryFilters from '../../common/types/ProfileSparkHistoryFilters';
import BattleAsset from '../../common/types/BattleAsset';
import { useAppContext } from  '../../common/app-context';
import { ApiService } from '../../common/api';
import CreateBattleComponent from '../../components/CreateBattleComponent/CreateBattleComponent';
import { getBattleHistory } from '../../store/actions/propertyActions';
import BattleHistoryComponent from '../../components/ViewBattleHistoryComponet/ViewBattleHistoryComponent';

interface StateProps {
  isLoadingCollections: boolean,
  hasLoadingInfoError: boolean,
  infoErrorMessage: string,

  collections: WebCollection[],

  authTokenSet: boolean,
  isProfileLoaded: boolean,
  userProfile: UserProfile,
  isLoadingProfile: boolean,
  hasError: boolean,
  errorMessage: string,
  filters: ProfilePropertyFilters,

  isLoadingHistory: boolean,
  nftHistory: WebNFTHistory[],
  hasLoadingHistoryError: boolean,
  historyDGoodId: number,

  sparkHistoryFilters: ProfileSparkHistoryFilters,
  nftFilters: ProfileNFTFilters,
  view: string,
  viewCategory: string
};

interface DispatchProps {
  updateLoggedInFilters: (filters: ProfilePropertyFilters) => void;
  getNFTHistory: (dgoodId: number) => void;
  closeNFTHistory: () => void;
  getPropertyHistory: (asset: BattleAsset) => void;
  updateView: (view: string, category: string) => void;
  updateNFTFilters: (filters: ProfileNFTFilters) => void;
  toggleImageModal: (url: string, name: string) => void;
  updateSparkHistoryFilters: (filters: ProfileSparkHistoryFilters) => void;
  getUserProfile: () => void;
  createBattle: (battleAsset: BattleAsset) => void;
  getBattleHistory: (battleAssetId: number) => void;
}

export type ProfileProps = DispatchProps & StateProps;

export const Profile = (props: ProfileProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.authTokenSet) {
      navigate("/Unauthorized");
    }
  }, [navigate, props.isProfileLoaded, props.authTokenSet])

  const updateFilters = (filters: ProfilePropertyFilters) => {
    props.updateLoggedInFilters(filters)
  }

  const renderUserProfile = () => {
    if (props.isLoadingProfile || props.isLoadingCollections) {
      return (
        <LoadingComponent />
      )
    } else if (props.hasError) {
      return (
        <ErrorComponent errorMessage={props.errorMessage} />
      );
    } else if (props.hasLoadingInfoError) {
      return (
        <ErrorComponent errorMessage={props.infoErrorMessage} />
      );
    }else {
      return (
        <UserProfileComponent 
          userProfile={props.userProfile} 
          isLookup={false} 
          hasError={props.hasError}
          filters={props.filters}
          getUserByUsername={() => {}} 
          updateFilters={updateFilters}
          isLoading={!props.isProfileLoaded}
          collections={props.collections}
          getNFTHistory={props.getNFTHistory}
          isLoadingHistory={props.isLoadingHistory}
          closeNFTHistory={props.closeNFTHistory}
          hasLoadingHistoryError={props.hasLoadingHistoryError}
          nftHistory={props.nftHistory}
          historyDGoodId={props.historyDGoodId}
          getPropertyHistory={props.getPropertyHistory} 
          nftFilters={props.nftFilters}
          updateNFTFilters={props.updateNFTFilters}
          updateView={props.updateView}
          view={props.view}
          viewCategory={props.viewCategory}
          toggleImageModal={props.toggleImageModal}
          updateSparkHistoryFilters={props.updateSparkHistoryFilters}
          sparkHistoryFilters={props.sparkHistoryFilters}
          trainAsset={props.getPropertyHistory}
          getUserProfile={props.getUserProfile}
          createBattle={props.createBattle}
          getBattleHistory={props.getBattleHistory}
          />
      )
    }
  }
  return (
    <>
      <ImageModalComponent/>
      <PropertyHistoryComponent/>
      <CreateBattleComponent />
      <BattleHistoryComponent />
      <Container fluid={true} className="bg-secondary text-light battleAsset-min-width">
        {renderUserProfile()}
      </Container>
    </>
  );
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    updateLoggedInFilters: (filters: ProfilePropertyFilters) => dispatch(updateLoggedInFilters(filters)),
    getNFTHistory: (dgoodId: number) => dispatch(getNFTHistory(dgoodId)),
    closeNFTHistory: () => dispatch(closeNFTHistory()),
    getPropertyHistory: (asset: BattleAsset) => dispatch(getPropertyHistory(asset)),
    updateView: (view: string, category: string) => dispatch(updateLoggedInView(view, category)),
    updateNFTFilters: (filters: ProfileNFTFilters) => dispatch(updateLoggedInNFTFilters(filters)),
    toggleImageModal: (url: string, name: string) => dispatch(toggleImageModal(url, name)),
    updateSparkHistoryFilters: (filters: ProfileSparkHistoryFilters) => dispatch(updateLoggedInSparkHistoryFilters(filters)),
    getUserProfile: () => dispatch(getUserProfile()),
    createBattle: (asset: BattleAsset) => dispatch(createBattle(asset)),
    getBattleHistory: (battleAssetId: number) => dispatch(getBattleHistory(battleAssetId))
  }

  return dispatchProps;
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    isLoadingCollections: state.InfoState.isLoadingCollections,
    hasLoadingInfoError: state.InfoState.hasError,
    infoErrorMessage: state.InfoState.errorMessage,

    collections: state.InfoState.collections,

    authTokenSet: state.LoginState.authTokenSet,
    isProfileLoaded: state.ProfileState.isProfileLoaded,
    userProfile: state.ProfileState.userProfile,
    isLoadingProfile: state.ProfileState.isLoadingProfile,
    hasError: state.ProfileState.hasError,
    errorMessage: state.ProfileState.errorMessage,
    filters: state.ProfileState.filters,

    isLoadingHistory: state.NFTState.isLoadingHistory,
    nftHistory: state.NFTState.nftHistory,
    hasLoadingHistoryError: state.NFTState.hasLoadingHistoryError,
    historyDGoodId: state.NFTState.historyDGoodId,

    sparkHistoryFilters: state.ProfileState.sparkHistoryFilters,
    nftFilters: state.ProfileState.nftFilters,
    view: state.ProfileState.view,
    viewCategory: state.ProfileState.viewCategory,
  }
  return stateProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);