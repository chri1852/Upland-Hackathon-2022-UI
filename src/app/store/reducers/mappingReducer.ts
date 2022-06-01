import { Reducer } from 'redux';
import { MappingState } from '../states/mappingState';
import {
  MappingActionTypes,
  GetMapActionType,
  GetMapCompletedActionType,
  GetMapFailedActionType,
  PostCreateMapActionType,
  PostCreateMapCompletedActionType,
  PostCreateMapFailedActionType,
  UpdateMappingFormActionType
} from '../actions/mappingActions';
import MappingForm from '../../common/types/MappingForm';

export type MappingActions = 
  GetMapActionType
  | GetMapCompletedActionType
  | GetMapFailedActionType
  | PostCreateMapActionType
  | PostCreateMapCompletedActionType
  | PostCreateMapFailedActionType
  | UpdateMappingFormActionType;

const initialMappingFormState: MappingForm = {
  cityId: 1,
  mapType: 'SOLD',
  mapKeyType: 0,
  customColors: ['#ff3333','#ff9933','#ffcc33','#ffee00','#ffff00','#99dd33','#009966','#00bb99','#0088bb','#334499','#aa3355'],
  activeColor: '#ff3333'
}

const initialState: MappingState = {
  isLoadingMap: false,
  hasError: false,
  errorMessage: '',
  
  mapFilePath: '',
  mapFound: false,
  notEnoughRuns: false,
  mapCreationDateTime: undefined,

  mappingForm: initialMappingFormState
}

export const MappingReducer: Reducer<MappingState> = (state = initialState, action: MappingActions): MappingState => {
  switch(action.type) {
    case MappingActionTypes.GetMap:
      return {
        ...state,
        isLoadingMap: true,
        hasError: false,
        errorMessage: '',

        mapFound: false,
        mapFilePath: '',
        mapCreationDateTime: undefined,

        notEnoughRuns: false,
      };
    case MappingActionTypes.GetMapCompleted:
      return {
        ...state,
        isLoadingMap: false,
        hasError: false,
        errorMessage: '',

        mapFound: action.payload!.response.mapFound,
        mapFilePath: action.payload!.response.mapFilePath,
        mapCreationDateTime: action.payload!.response.mapCreationDateTime
      };
    case MappingActionTypes.GetMapFailed:
      return {
        ...state,
        isLoadingMap: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        mapFound: false,
        mapFilePath: '',
        mapCreationDateTime: undefined,
      };
    case MappingActionTypes.PostCreateMap:
      return {
        ...state,
        isLoadingMap: true,
        hasError: false,
        errorMessage: '',

        mapFound: false,
        mapFilePath: '',
        mapCreationDateTime: undefined,
        notEnoughRuns: false
      };
    case MappingActionTypes.PostCreateMapCompleted:
      return {
        ...state,
        isLoadingMap: false,
        hasError: false,
        errorMessage: '',

        mapFound: true,
        mapFilePath: action.payload!.response.mapFilePath,
        mapCreationDateTime: action.payload!.response.mapCreationDateTime,

        notEnoughRuns: action.payload!.response.notEnoughRuns
      };
    case MappingActionTypes.PostCreateMapFailed:
      return {
        ...state,
        isLoadingMap: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        mapFound: false,
        mapFilePath: '',  
        mapCreationDateTime: undefined,
        notEnoughRuns: false,    
      };
    case MappingActionTypes.UpdateMappingForm:
      return {
        ...state,
        mappingForm: action.payload!.mappingForm
      };
    default:
      return state;
  }
}

export default MappingReducer;