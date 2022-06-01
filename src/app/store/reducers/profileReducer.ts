import { Reducer } from 'redux';
import ProfileState from '../states/profileState';
import UserProfile from '../../common/types/UserProfile';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import { LoginActionTypes, LogoutActionType } from '../actions/loginActions';
import {
  ProfileActionTypes,
  GetUserProfileActionType,
  GetUserProfileCompletedActionType,
  GetUserProfileFailedActionType,
  UpdateLoggedInFiltersActionType,
  GetUserRunCountActionType,
  GetUserRunCountCompletedActionType,
  GetUserRunCountFailedActionType,
  UpdateLoggedInNFTFiltersActionType,
  UpdateLoggedInViewActionType,
  UpdateLoggedInSparkHistoryFiltersActionType,
} from '../actions/profileActions';
import ProfileNFTFilters from '../../common/types/ProfileNFTFilters';

export type ProfileActions = 
  GetUserProfileActionType
  | GetUserProfileCompletedActionType
  | GetUserProfileFailedActionType
  | UpdateLoggedInFiltersActionType
  | UpdateLoggedInNFTFiltersActionType
  | GetUserRunCountActionType
  | GetUserRunCountCompletedActionType
  | GetUserRunCountFailedActionType
  | LogoutActionType
  | UpdateLoggedInViewActionType
  | UpdateLoggedInSparkHistoryFiltersActionType;

const initialUserProfile: UserProfile = {
  username: '',
  eosAccount: '',
  avatarLink: '',
  avatarColor: '',
  rank: '',
  networth: 0,
  jailed: false,
  registeredUser: false,
  supporter: false,
  runCount: 0,
  maxRuns: 0,
  upxToNextRun: 0,
  upxToSupporter: 0,
  registeredUserId: 0,
  collections: [],
  badges: [],
  properties: [],
  profileNFTs: [],
  joined: new Date(),
  unstakedSpark: 0,
  stakedSpark: 0,
  monthlyEarnings: 0,
  sparkHistory: [],
  id: '',
  eosId: '',
  level: '',
  avatarUrl: '',
  initialCity: '',
  currentCity: '',
  battleAssets: []
}

const initialFilterState: ProfilePropertyFilters = {
  Address: '',
  City: '',
  Neighborhood: '',
  Status: '',
  Building: '',
  AddressSort: 0,
  CitySort: 0,
  NeighborhoodSort: 0,
  SizeSort: 0,
  CollectionSort: 0,
  MintSort: 0,
  BoostSort: 0,
  StatusSort: 0,
  BuildingSort: 0,
  MintedSort: 0,
  AcquiredOnSort: 0,
  PageNumber: 1
}

const initialNFTFilterState: ProfileNFTFilters = {
  name: '',
  team: '',
  season: '',
  position: '',
  model: '',
  opponent: '',
  homeTeam: '',
  series: '',
  description: '',
  rarity: '',
  buildingType: '',
  address: '',

  mintSort: 0,
  nameSort: 0,
  teamSort: 0,
  seasonSort: 0,
  positionSort: 0,
  fanPointsSort: 0,
  modelSort: 0,
  gameDateSort: 0,
  opponentSort: 0,
  homeTeamSort: 0,
  variantSort: 0,
  seriesSort: 0,
  raritySort: 0,
  buildingTypeSort: 0,
  addressSort: 0,
  descriptionSort: 0,

  pageNumber: 1
}

const initialSparkHistoryFilters = {
  name: '',
  address: '',

  nameSort: 0,
  addressSort: 0,
  amountSort: 0,
  startSort: 0,
  endSort: 0,
  sparkHoursSort: 0,
  
  pageNumber: 1
}

const initialState: ProfileState = {
  isProfileLoaded: false,
  userProfile: initialUserProfile,
  isLoadingProfile: false,
  hasError: false,
  errorMessage: '',
  filters: initialFilterState,
  nftFilters: initialNFTFilterState,
  sparkHistoryFilters: initialSparkHistoryFilters,
  view: 'Properties',
  viewCategory: 'blkexplorer'
}

export const ProfileReducer: Reducer<ProfileState> = (state = initialState, action: ProfileActions): ProfileState => {
  switch(action.type) {
    case ProfileActionTypes.GetUserProfile:
      return {
        ...state,
        isProfileLoaded: false,
        isLoadingProfile: true,
        hasError: false,
        errorMessage: '',
        userProfile: initialUserProfile,
        filters: initialFilterState
      };
    case ProfileActionTypes.GetUserProfileCompleted:
      return {
        ...state,
        isProfileLoaded: true,
        userProfile: action.payload!.response.userProfile,
        isLoadingProfile: false,
        hasError: false,
        errorMessage: '',
      };
    case ProfileActionTypes.GetUserProfileFailed:
      return {
        ...state,
        userProfile: initialUserProfile,
        isLoadingProfile: false,
        hasError: true,
        errorMessage: action.payload!.error as any,
      };
    case ProfileActionTypes.UpdateLoggedInFilters:
      return {
        ...state,
        filters: action.payload!.filters
      }
    case ProfileActionTypes.UpdateLoggedInNFTFilters:
      return {
        ...state,
        nftFilters: action.payload!.filters
      }
    case ProfileActionTypes.GetUserRunCount:
      return {
        ...state
      }
    case ProfileActionTypes.GetUserRunCountCompleted:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          registeredUser: action.payload!.response.registeredUser,
          supporter: action.payload!.response.supporter,
          runCount: action.payload!.response.runCount,
          maxRuns: action.payload!.response.maxRuns,
          upxToNextRun: action.payload!.response.upxToNextRun,
          upxToSupporter: action.payload!.response.upxToSupporter
        }
      }
    case ProfileActionTypes.GetUserRunCountFailed:
      return {
        ...state
      }
    case LoginActionTypes.Logout:
      return initialState;
    case ProfileActionTypes.UpdateLoggedInView:
      return {
        ...state,
        view: action.payload!.view,
        viewCategory: action.payload!.category
      }
    case ProfileActionTypes.UpdateLoggedInSparkHistoryFilters:
      return {
        ...state,
        sparkHistoryFilters: action.payload!.filters
      }
    default:
      return state;
  }
}

export default ProfileReducer;