import { Reducer } from 'redux';
import WebNFT from '../../common/types/WebNFT';
import WebNFTFilters from '../../common/types/WebNFTFilters';
import { NFTState } from '../states/nftState';
import {
  NFTActionTypes,
  GetNFTHistoryActionType,
  GetNFTHistoryCompletedActionType,
  GetNFTHistoryFailedActionType,
  PostSearchNFTActionType,
  PostSearchNFTCompletedActionType,
  PostSearchNFTFailedActionType,
  UpdateNFTFormActionType,
  UpdateNFTFormCategoryActionType,
  CloseNFTHistoryActionType,
  ToggleImageModalActionType
} from '../actions/nftActions';

export type NFTActions = 
  GetNFTHistoryActionType
  | GetNFTHistoryCompletedActionType
  | GetNFTHistoryFailedActionType
  | PostSearchNFTActionType
  | PostSearchNFTCompletedActionType
  | PostSearchNFTFailedActionType
  | UpdateNFTFormActionType
  | UpdateNFTFormCategoryActionType
  | CloseNFTHistoryActionType
  | ToggleImageModalActionType;

const initialFilters: WebNFT = {
  gameDate: new Date(),
  fanPoints: 0,
  position: "",
  year: "2020",
  isVariant: false,
  team: "",
  seriesName: "",
  seriesId: 0,
  opponent: "",
  description: "",
  rarity: "",
  currentSupply: 0,
  maxSupply: 0,
  owner: "",
  name: "",
  serialNumber: 0,
  link: "",
  image: "",
  dGoodId: 0,
  buildingType: "",
  homeTeam: "",
  modelType: "",
  propertyId: 0,
  fullAddress: "",

  isVariantFilter: 0,
  category: ""
}

const initialFormValues: WebNFTFilters = {
  filters: initialFilters,
  includeBurned:  false,
  sortBy: "Mint",
  sortDescending: false,
  category: "essential",
  pageSize: 100,
  page: 1,
  noPaging: false
}
 
const initialState: NFTState = {
  isLoadingNFTs: false,
  hasError: false,
  errorMessage: '',

  nfts: [],

  isLoadingHistory: false,
  nftHistory: [],
  hasLoadingHistoryError: false,
  loadingHistoryError: '',
  historyDGoodId: 0,

  nftUrl: '',
  nftImageName: '',

  formValues: initialFormValues
}

export const NFTReducer: Reducer<NFTState> = (state = initialState, action: NFTActions): NFTState => {
  switch(action.type) {
    case NFTActionTypes.GetNFTHistory:
      return {
        ...state,
        isLoadingHistory: true,
        hasLoadingHistoryError: false,
        loadingHistoryError: '',
        nftHistory: [],
        historyDGoodId: action.payload!.request
      };
    case NFTActionTypes.GetNFTHistoryCompleted:
      return {
        ...state,
        isLoadingHistory: false,
        hasLoadingHistoryError: false,
        loadingHistoryError: '',
        nftHistory: action.payload!.response.history
      };
    case NFTActionTypes.GetNFTHistoryFailed:
      return {
        ...state,
        isLoadingHistory: false,
        hasLoadingHistoryError: true,
        loadingHistoryError: action.payload!.error as any,
        nftHistory: [],
        historyDGoodId: 0
      };
    case NFTActionTypes.PostSearchNFT:
      return {
        ...state,
        hasError: false,
        errorMessage: '',
        isLoadingNFTs: true,
        nfts: []
      };
    case NFTActionTypes.PostSearchNFTCompleted:
      return {
        ...state,
        hasError: false,
        errorMessage: '',
        isLoadingNFTs: false,
        nfts: action.payload!.response.nfTs
      };
    case NFTActionTypes.PostSearchNFTFailed:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload!.error as any,
        isLoadingNFTs: false,
        nfts: []
      };
    case NFTActionTypes.UpdateNFTForm:
      return {
        ...state,
        formValues: action.payload!.formValues
      }
    case NFTActionTypes.UpdateNFTFormCategory:
      return {
        ...state,
        nfts: [],
        formValues: {
          ...initialFormValues,
          category: action.payload!.category
        },
      }
    case NFTActionTypes.CloseNFTHistory:
      return {
        ...state,
        isLoadingHistory: false,
        hasLoadingHistoryError: false,
        loadingHistoryError: "",
        nftHistory: [],
        historyDGoodId: 0
      }
    case NFTActionTypes.ToggleImageModal:
      return {
        ...state,
        nftUrl: action.payload!.url,
        nftImageName: action.payload!.imageName
      }
    default:
      return state;
  }
}

export default NFTReducer;