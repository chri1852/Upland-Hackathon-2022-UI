import { Reducer } from 'redux';
import { InfoState } from '../states/infoState';
import {
  InfoActionTypes,
  GetCollectionsActionType,
  GetCollectionsCompletedActionType,
  GetCollectionsFailedActionType,
  GetNeighborhoodsActionType,
  GetNeighborhoodsCompletedActionType,
  GetNeighborhoodsFailedActionType,
  GetBlockchainStatusCompletedActionType,
  GetBlockchainStatusFailedActionType,
  GetStreetsActionType,
  GetStreetsCompletedActionType,
  GetStreetsFailedActionType,
  GetStatsActionType,
  GetStatsCompletedActionType,
  GetStatsFailedActionType,
  UpdateStatsFormActionType,
  GetAnnouncementsCompletedActionType,
  GetAnnouncementsFailedActionType
} from '../actions/infoActions';
import StatsFormState from '../../common/types/StatsFormState';

export type InfoActions = 
  GetCollectionsActionType
  | GetCollectionsCompletedActionType
  | GetCollectionsFailedActionType
  | GetNeighborhoodsActionType
  | GetNeighborhoodsCompletedActionType
  | GetNeighborhoodsFailedActionType
  | GetStreetsActionType
  | GetStreetsCompletedActionType
  | GetStreetsFailedActionType
  | GetStreetsActionType
  | GetStatsActionType
  | GetStatsCompletedActionType
  | GetStatsFailedActionType
  | GetStreetsFailedActionType
  | GetBlockchainStatusCompletedActionType
  | GetBlockchainStatusFailedActionType
  | GetAnnouncementsCompletedActionType
  | GetAnnouncementsFailedActionType
  | UpdateStatsFormActionType;

const initalStatsFormState: StatsFormState = {
  page: 1,
  type: 1,
  cityId: 0,
  nameFilter: '',

  nameSort: 0,
  citySort: 0,
  totalPropsSort: 0,
  lockedPropsSort: 0,
  unlockedPropsSort: 0,
  unlockedFSAPropsSort: 0,
  forSalePropsSort: 0,
  ownedPropsSort: 0,
  percentMintedSort: 0,
  percentMintedNonFSASort: 0,
  buildingsCountSort: 0,
  percentBuiltSort: 0,
}
 
const initialState: InfoState = {
  isLoadingNeighborhoods: false,
  isLoadingCollections: false,
  isLoadingStreets: false,
  isLoadingStats: false,
  hasError: false,
  errorMessage: '',
  hasStatsError: false,
  statsErrorMessage: '',
  
  collections: [],
  neighborhoods: [],
  streets: [],

  cityStats: [],
  neighborhoodStats: [],
  streetStats: [],
  collectionStats: [],

  isBlockchainDisabled: false,

  hasAnnouncement: false,
  announcement: "",

  statsFormState: initalStatsFormState
}

export const InfoReducer: Reducer<InfoState> = (state = initialState, action: InfoActions): InfoState => {
  switch(action.type) {
    case InfoActionTypes.GetCollections:
      return {
        ...state,
        isLoadingCollections: true,
        hasError: false,
        errorMessage: '',

        collections: [],
      };
    case InfoActionTypes.GetCollectionsCompleted:
      return {
        ...state,
        isLoadingCollections: false,
        hasError: false,
        errorMessage: '',

        collections: action.payload!.response.collections
      };
    case InfoActionTypes.GetCollectionsFailed:
      return {
        ...state,
        isLoadingCollections: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        collections: [],
      };
    case InfoActionTypes.GetNeighborhoods:
      return {
        ...state,
        isLoadingNeighborhoods: true,
        hasError: false,
        errorMessage: '',

        neighborhoods: [],
      };
    case InfoActionTypes.GetNeighborhoodsCompleted:
      return {
        ...state,
        isLoadingNeighborhoods: false,
        hasError: false,
        errorMessage: '',

        neighborhoods: action.payload!.response.neighborhoods
      };
    case InfoActionTypes.GetNeighborhoodsFailed:
      return {
        ...state,
        isLoadingNeighborhoods: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        neighborhoods: [],   
      };
    case InfoActionTypes.GetStreets:
      return {
        ...state,
        isLoadingStreets: true,
        hasError: false,
        errorMessage: '',

        streets: [],
      };
    case InfoActionTypes.GetStreetsCompleted:
      return {
        ...state,
        isLoadingStreets: false,
        hasError: false,
        errorMessage: '',

        streets: action.payload!.response.streets
      };
    case InfoActionTypes.GetStreetsFailed:
      return {
        ...state,
        isLoadingStreets: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        streets: [],   
      };
    case InfoActionTypes.GetStats:
      switch(action.payload!.type) {
        case 2:
          return {
            ...state,
            isLoadingStats: true,
            hasStatsError: false,
            statsErrorMessage: '',

            neighborhoodStats: []
          }
        case 3:
          return {
            ...state,
            isLoadingStats: true,
            hasStatsError: false,
            statsErrorMessage: '',

            streetStats: []
          }
        case 4:
          return {
            ...state,
            isLoadingStats: true,
            hasStatsError: false,
            statsErrorMessage: '',

            collectionStats: []
          }
        default:
          return {
            ...state,
            isLoadingStats: true,
            hasStatsError: false,
            statsErrorMessage: '',

            cityStats: []
          }
      }
    case InfoActionTypes.GetStatsCompleted:
      switch(action.payload!.response.type) {
        case 2:
          return {
            ...state,
            isLoadingStats: false,
            hasStatsError: false,
            statsErrorMessage: '',

            neighborhoodStats: action.payload!.response.stats
          }
        case 3:
          return {
            ...state,
            isLoadingStats: false,
            hasStatsError: false,
            statsErrorMessage: '',

            streetStats: action.payload!.response.stats
          }
        case 4:
          return {
            ...state,
            isLoadingStats: false,
            hasStatsError: false,
            statsErrorMessage: '',

            collectionStats: action.payload!.response.stats
          }
        default:
          return {
            ...state,
            isLoadingStats: false,
            hasStatsError: false,
            statsErrorMessage: '',

            cityStats: action.payload!.response.stats
          }
      }
    case InfoActionTypes.GetStatsFailed:
      return {
        ...state,
        isLoadingStats: false,
        hasStatsError: true,
        statsErrorMessage: action.payload!.error as any, 
      };
    case InfoActionTypes.GetBlockchainStatusCompleted:
      return {
        ...state,
        isBlockchainDisabled: action.payload!.response.isBlockchainUpdatesDisabled
      };
    case InfoActionTypes.GetBlockchainStatusFailed:
      return {
        ...state,
        isBlockchainDisabled: true
      };
    case InfoActionTypes.GetAnnouncementsCompleted:
      return {
        ...state,
        hasAnnouncement: action.payload!.response.hasAnnouncement,
        announcement: action.payload!.response.announcement
      };
    case InfoActionTypes.GetAnnouncementsFailed:
      return {
        ...state,
        hasAnnouncement: false,
        announcement: ""
      };
    case InfoActionTypes.UpdateStatsForm:
      return {
        ...state,
        statsFormState: action.payload!.form
      }
    default:
      return state;
  }
}

export default InfoReducer;