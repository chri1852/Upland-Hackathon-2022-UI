import { Reducer } from 'redux';
import AppraisalResults from '../../common/types/AppraisalResults';
import { AppraisalState } from '../states/appraisalState';
import {
  AppraisalActionTypes,
  GetLastAppraisalActionType,
  GetLastAppraisalCompletedActionType,
  GetLastAppraisalFailedActionType,
  PostRunAppraisalActionType,
  PostRunAppraisalCompletedActionType,
  PostRunAppraisalFailedActionType
} from '../actions/appraisalActions';

export type AppraisalActions = 
  GetLastAppraisalActionType
  | GetLastAppraisalCompletedActionType
  | GetLastAppraisalFailedActionType
  | PostRunAppraisalActionType
  | PostRunAppraisalCompletedActionType
  | PostRunAppraisalFailedActionType;

const initialAppraisalResults: AppraisalResults = {
  username: '',
  runDateTime: new Date(),
  
  properties: []
}

const initialState: AppraisalState = {
  isLoadingAppraisal: false,
  hasError: false,
  errorMessage: '',
  
  appraisalResults: initialAppraisalResults,
  runFound: false,

  runRequested: false,
  notEnoughRuns: false
}

export const AppraisalReducer: Reducer<AppraisalState> = (state = initialState, action: AppraisalActions): AppraisalState => {
  switch(action.type) {
    case AppraisalActionTypes.GetLastAppraisal:
      return {
        ...state,
        isLoadingAppraisal: true,
        hasError: false,
        errorMessage: '',

        runFound: false,
        appraisalResults: initialAppraisalResults,

        runRequested: false,
        notEnoughRuns: false
      };
    case AppraisalActionTypes.GetLastAppraisalCompleted:
      return {
        ...state,
        isLoadingAppraisal: false,
        hasError: false,
        errorMessage: '',

        runFound: action.payload!.response.results ? true : false,
        appraisalResults: action.payload!.response.results
      };
    case AppraisalActionTypes.GetLastAppraisalFailed:
      return {
        ...state,
        isLoadingAppraisal: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        runFound: false,
        appraisalResults: initialAppraisalResults
      };
    case AppraisalActionTypes.PostRunAppraisal:
      return {
        ...state,
        isLoadingAppraisal: true,
        hasError: false,
        errorMessage: '',

        runFound: false,
        appraisalResults: initialAppraisalResults,

        runRequested: true,
        notEnoughRuns: false
      };
    case AppraisalActionTypes.PostRunAppraisalCompleted:
      return {
        ...state,
        isLoadingAppraisal: false,
        hasError: false,
        errorMessage: '',

        runFound: true,
        appraisalResults: action.payload!.response.results,

        runRequested: false,
        notEnoughRuns: action.payload!.response.notEnoughRuns
      };
    case AppraisalActionTypes.PostRunAppraisalFailed:
      return {
        ...state,
        isLoadingAppraisal: false,
        hasError: true,
        errorMessage: action.payload!.error as any,

        runFound: false,
        appraisalResults: initialAppraisalResults,  

        runRequested: false,    
      };
    default:
      return state;
  }
}

export default AppraisalReducer;