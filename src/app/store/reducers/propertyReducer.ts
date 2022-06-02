import { Reducer } from 'redux';
import { PropertyState } from '../states/propertyState';
import WebForSaleFilters from '../../common/types/WebForSaleFilters';
import Battle from '../../common/types/Battle';
import {
  PropertyActionTypes,
  PostPropertiesForSaleActionType,
  PostPropertiesForSaleCompletedActionType,
  PostPropertiesForSaleFailedActionType,
  PostPropertiesUnmintedActionType,
  PostPropertiesUnmintedCompletedActionType,
  PostPropertiesUnmintedFailedActionType,
  UpdateForSaleFormActionType,
  UpdateUnmintedFormActionType,
  GetPropertyHistoryActionType,
  ClosePropertyHistoryActionType,
  CreateBattleActionType,
  CloseCreateBattleActionType,
  GetBattleHistoryCompletedActionType,
  CloseBattleHistoryActionType,
  JoinBattleActionType,
  CloseJoinBattleActionType
} from '../actions/propertyActions';
import BattleAsset from '../../common/types/BattleAsset';

export type PropertyActions = 
  PostPropertiesForSaleActionType
  | PostPropertiesForSaleCompletedActionType
  | PostPropertiesForSaleFailedActionType
  | PostPropertiesUnmintedActionType
  | PostPropertiesUnmintedCompletedActionType
  | PostPropertiesUnmintedFailedActionType
  | UpdateForSaleFormActionType
  | UpdateUnmintedFormActionType
  | GetPropertyHistoryActionType
  | ClosePropertyHistoryActionType
  | CreateBattleActionType
  | CloseCreateBattleActionType
  | GetBattleHistoryCompletedActionType
  | CloseBattleHistoryActionType
  | JoinBattleActionType
  | CloseJoinBattleActionType;

const initialForSaleFormState: WebForSaleFilters = {
  cityId: 1,
  owner: '',
  address: '',
  neighborhoodIds: [],
  collectionIds: [],
  buildings: [],
  fsa: undefined,
  currency: 'Any',
  asc: true,
  orderBy: 'Price',
  pageSize: 100,
  page: 1
}

const initialUnmintedFormState: WebForSaleFilters = {
  cityId: 1,
  owner: '',
  address: '',
  neighborhoodIds: [],
  collectionIds: [],
  buildings: [],
  fsa: undefined,
  currency: 'Any',
  asc: true,
  orderBy: 'Mint',
  pageSize: 100,
  page: 1
}

const initialState: PropertyState = {
  propertiesForSale: [],
  propertiesUnminted: [],

  isLoadingForSaleProperties: false,
  hasErrorForSaleProp: false,
  errorForSalePropsMessage: '',

  isLoadingUnmintedProperties: false,
  hasErrorUnmintedProp: false,
  errorUnmintedPropsMessage: '',

  forSaleFormState: initialForSaleFormState,
  forSaleSelectedCollections: [],
  forSaleSelectedNeighborhoods: [],
  forSaleSelectedBuildings: [],

  unmintedFormState: initialUnmintedFormState,
  unmintedSelectedCollections: [],
  unmintedSelectedNeighborhoods: [],
  unmintedSelectedFSA: 'Any',

  isLoadingHistory: false,
  battleAsset: {} as BattleAsset,
  showModal: false,
  hasLoadingHistoryError: false,
  loadingHistoryError: '',

  showBattleModal: false,
  battleBattleAsset: {} as BattleAsset,

  showBattleHistoryModal: false,
  battleHistory: [],

  showJoinBattleModal: false,
  joinBattleId: 0,
}

export const PropertyReducer: Reducer<PropertyState> = (state = initialState, action: PropertyActions): PropertyState => {
  switch(action.type) {
    case PropertyActionTypes.PostPropertiesForSale:
      return {
        ...state,
        isLoadingForSaleProperties: true,
        hasErrorForSaleProp: false,
        errorForSalePropsMessage: '',
        propertiesForSale: []
      };
    case PropertyActionTypes.PostPropertiesForSaleCompleted:
      return {
        ...state,
        isLoadingForSaleProperties: false,
        hasErrorForSaleProp: false,
        errorForSalePropsMessage: '',

        propertiesForSale: action.payload!.response.properties
      };
    case PropertyActionTypes.PostPropertiesForSaleFailed:
      return {
        ...state,
        isLoadingForSaleProperties: false,
        hasErrorForSaleProp: true,
        errorForSalePropsMessage: action.payload!.error as any,

        propertiesForSale: []
      };
    case PropertyActionTypes.PostPropertiesUnminted:
      return {
        ...state,
        isLoadingUnmintedProperties: true,
        hasErrorUnmintedProp: false,
        errorUnmintedPropsMessage: '',
        propertiesUnminted: []
      };
    case PropertyActionTypes.PostPropertiesUnmintedCompleted:
      return {
        ...state,
        isLoadingUnmintedProperties: false,
        hasErrorUnmintedProp: false,
        errorUnmintedPropsMessage: '',

        propertiesUnminted: action.payload!.response
      };
    case PropertyActionTypes.PostPropertiesUnmintedFailed:
      return {
        ...state,
        isLoadingUnmintedProperties: false,
        hasErrorUnmintedProp: true,
        errorUnmintedPropsMessage: action.payload!.error as any,

        propertiesUnminted: []
      };
    case PropertyActionTypes.UpdateForSaleForm:
      return {
        ...state,
        forSaleFormState: action.payload!.filters,
        forSaleSelectedCollections: action.payload!.collections,
        forSaleSelectedNeighborhoods: action.payload!.neighborhoods,
        forSaleSelectedBuildings: action.payload!.buildings,
      };
    case PropertyActionTypes.UpdateUnmintedForm:
      return {
        ...state,
        unmintedFormState: action.payload!.filters,
        unmintedSelectedCollections: action.payload!.collections,
        unmintedSelectedNeighborhoods: action.payload!.neighborhoods,
        unmintedSelectedFSA: action.payload!.fsas,
      };

    case PropertyActionTypes.GetPropertyHistory:
      return {
        ...state,
        isLoadingHistory: false,
        showModal: true,
        battleAsset: action.payload!.battleAsset,
        hasLoadingHistoryError: false,
        loadingHistoryError: ''
      }
    case PropertyActionTypes.ClosePropertyHistory:
      return {
        ...state,
        isLoadingHistory: false,
        showModal: false,
        hasLoadingHistoryError: false,
        loadingHistoryError: "",
        battleAsset: {} as BattleAsset
      }
    case PropertyActionTypes.CreateBattle:
      return {
        ...state,
        showBattleModal: true,
        battleBattleAsset: action.payload!.battleAsset,
      }
    case PropertyActionTypes.CloseCreateBattle:
      return {
        ...state,
        showBattleModal: false,
        battleBattleAsset: {} as BattleAsset
      }
    case PropertyActionTypes.GetBattleHistoryCompleted:
      return {
        ...state,
        showBattleHistoryModal: true,
        battleHistory: action!.payload!.battleHistory
      }
    case PropertyActionTypes.CloseBattleHistory:
      return {
        ...state,
        showBattleHistoryModal: false,
      }
    case PropertyActionTypes.JoinBattle:
      return {
        ...state,
        showJoinBattleModal: true,
        joinBattleId: action.payload!.battleId,
      }
    case PropertyActionTypes.CloseJoinBattle:
      return {
        ...state,
        showJoinBattleModal: false,
        joinBattleId: 0
      }
    default:
      return state;
  }
}

export default PropertyReducer;