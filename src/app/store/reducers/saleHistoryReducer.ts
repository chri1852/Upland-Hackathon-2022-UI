import { Reducer } from 'redux';
import { SaleHistoryState } from '../states/salehistoryState';
import WebSaleHistoryFilters from '../../common/types/WebSaleHistoryFilters';
import {
  SaleHistoryActionTypes,
  PostSaleHistoryActionType,
  PostSaleHistoryCompletedActionType,
  PostSaleHistoryFailedActionType,
  UpdateSaleHistoryFormActionType,
} from '../actions/saleHistoryActions';

export type SaleHistoryActions = 
  PostSaleHistoryActionType
  | PostSaleHistoryCompletedActionType
  | PostSaleHistoryFailedActionType
  | UpdateSaleHistoryFormActionType;

const today = new Date();
const initialFromDate = new Date(today.setDate(today.getDate() - 90));

const initialSaleHistoryFormState: WebSaleHistoryFilters = {
  cityIdSearch: true,
  searchByUsername: undefined,
  searchByCityId: 1,
  noSales: false,
  noSwaps: true,
  noOffers: false,
  currency: '',
  address: '',
  username: '',
  neighborhoodIds: [],
  collectionIds: [],
  fromDate: initialFromDate,
  toDate: new Date(),
  pageSize: 100,
  page: 1
}

const initialState: SaleHistoryState = {
  saleHistoryEntries: [],

  isLoadingSaleHistoryEntries: false,
  hasErrorSaleHistoryEntries: false,
  errorSaleHistoryEntriesMessage: '',

  saleHistoryFormState: initialSaleHistoryFormState,
  saleHistorySelectedCollections: [],
  saleHistorySelectedNeighborhoods: [],
  saleHistorySelectedSearchType: 1
}

export const SaleHistoryReducer: Reducer<SaleHistoryState> = (state = initialState, action: SaleHistoryActions): SaleHistoryState => {
  switch(action.type) {
    case SaleHistoryActionTypes.PostSaleHistory:
      return {
        ...state,
        isLoadingSaleHistoryEntries: true,
        hasErrorSaleHistoryEntries: false,
        errorSaleHistoryEntriesMessage: '',
        saleHistoryEntries: []
      };
    case SaleHistoryActionTypes.PostSaleHistoryCompleted:
      return {
        ...state,
        isLoadingSaleHistoryEntries: false,
        hasErrorSaleHistoryEntries: false,
        errorSaleHistoryEntriesMessage: '',

        saleHistoryEntries: action.payload!.response.saleHistoryEntries
      };
    case SaleHistoryActionTypes.PostSaleHistoryFailed:
      return {
        ...state,
        isLoadingSaleHistoryEntries: false,
        hasErrorSaleHistoryEntries: true,
        errorSaleHistoryEntriesMessage: action.payload!.error as any,

        saleHistoryEntries: []
      };
    case SaleHistoryActionTypes.UpdateSaleHistoryForm:
      return {
        ...state,
        saleHistoryFormState: action.payload!.filters,
        saleHistorySelectedCollections: action.payload!.collections,
        saleHistorySelectedNeighborhoods: action.payload!.neighborhoods,
        saleHistorySelectedSearchType: action.payload!.selectedSearchType
      };
    default:
      return state;
  }
}

export default SaleHistoryReducer;