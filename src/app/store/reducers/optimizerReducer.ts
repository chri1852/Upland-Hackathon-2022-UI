import { Reducer } from 'redux';
import OptimizerResults from '../../common/types/OptimizerResults';
import { OptimizerState } from '../states/optimizerState';
import {
  OptimizerActionTypes,
  GetLastOptimizerRunActionType,
  GetLastOptimizerRunCompletedActionType,
  GetLastOptimizerRunFailedActionType,
  PostOptimizerRunActionType,
  PostOptimizerRunCompletedActionType,
  PostOptimizerRunFailedActionType,
  UpdateOptimizerFormActionType
} from '../actions/optimizerActions';

export type OptimizerActions = 
  GetLastOptimizerRunActionType
  | GetLastOptimizerRunCompletedActionType
  | GetLastOptimizerRunFailedActionType
  | PostOptimizerRunActionType
  | PostOptimizerRunCompletedActionType
  | PostOptimizerRunFailedActionType
  | UpdateOptimizerFormActionType;

const initialOptimizerResults: OptimizerResults = {
  username: '',
  runDateTime: new Date(),
  timeToRun: new Date(),
  qualityLevel: 7,
  baseTotalIncome: 0,
  boostedTotalIncome: 0,

  optimizedCollections: [],
  unfilledCollections: [],
  unoptimizedCollections: [],
  extraCollections: [],
  missingCollections: [],
}

const initialState: OptimizerState = {
  isLoadingOptimization: false,
  hasError: false,
  errorMessage: '',
  
  optimizerResults: initialOptimizerResults,
  runFound: false,
  runCompleted: false,
  runFailed: false,

  runRequested: false,
  notEnoughRuns: false,

  sortBy: "UPX"
}

export const OptimizerReducer: Reducer<OptimizerState> = (state = initialState, action: OptimizerActions): OptimizerState => {
  switch(action.type) {
    case OptimizerActionTypes.GetLastOptimizerRun:
      return {
        ...state,
        isLoadingOptimization: true,
        hasError: false,
        errorMessage: '',
        runFound: false,
        runCompleted: false,
        runFailed: false,
        optimizerResults: initialOptimizerResults,
        runRequested: false,
        notEnoughRuns: false
      };
    case OptimizerActionTypes.GetLastOptimizerRunCompleted:
      return {
        ...state,
        isLoadingOptimization: false,
        hasError: false,
        errorMessage: '',
        runFound: action.payload!.response.runFound,
        runCompleted: action.payload!.response.runCompleted,
        runFailed: action.payload!.response.runFailed,
        optimizerResults: action.payload!.response.results,
        runRequested: false,
        notEnoughRuns: false
      };
    case OptimizerActionTypes.GetLastOptimizerRunFailed:
      return {
        ...state,
        isLoadingOptimization: false,
        hasError: true,
        errorMessage: action.payload!.error as any,
        runFound: false,
        runCompleted: false,
        runFailed: false,
        optimizerResults: initialOptimizerResults,
        runRequested: false,
        notEnoughRuns: false
      };
    case OptimizerActionTypes.PostOptimizerRun:
      return {
        ...state,
        hasError: false,
        errorMessage: '',
        runRequested: true,
        notEnoughRuns: false,
        runFound: false,
        runCompleted: false,
        runFailed: false,
        optimizerResults: initialOptimizerResults,
      };
    case OptimizerActionTypes.PostOptimizerRunCompleted:
      return {
        ...state,
        hasError: false,
        errorMessage: '',
        runRequested: false,
        notEnoughRuns: action.payload!.response.notEnoughRuns,
        runFound: true,
        runCompleted: false,
        runFailed: false,
      };
    case OptimizerActionTypes.PostOptimizerRunFailed:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload!.error as any,
        runRequested: false,
        notEnoughRuns: false,
        runFound: true,
        runCompleted: false,
        runFailed: true,
      };
    case OptimizerActionTypes.UpdateOptimizerForm:
      return {
        ...state,
        sortBy: action.payload!.sortBy
      }
    default:
      return state;
  }
}

export default OptimizerReducer;