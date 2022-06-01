import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetLastAppraisalResponse from '../../common/types/messages/GetLastAppraisalResponse';
import PostRunAppraisalResponse from '../../common/types/messages/PostRunAppraisalResponse';
import {
  AppraisalActionTypes,
  GetLastAppraisalActionType,
  GetLastAppraisalCompletedActionType,
  GetLastAppraisalFailedActionType,
  PostRunAppraisalActionType,
  PostRunAppraisalCompletedActionType,
  PostRunAppraisalFailedActionType,
  getLastAppraisalCompleted,
  getLastAppraisalFailed,
  postRunAppraisalCompleted,
  postRunAppraisalFailed
} from '../actions/appraisalActions';

export const getLastAppraisalEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(AppraisalActionTypes.GetLastAppraisal),
    mergeMap((action) => onGetLastAppraisal(action, dependencies))
  );
}

export const onGetLastAppraisal: (action: GetLastAppraisalActionType, dependencies: AppDependencies) 
  => Observable<GetLastAppraisalCompletedActionType | GetLastAppraisalFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getLastAppraisal$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return getLastAppraisalCompleted(response.response as GetLastAppraisalResponse);
    }),
    catchError(error => {
      return of(getLastAppraisalFailed(error.response.message));
    })
  );
}

export const postRunAppraisalEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(AppraisalActionTypes.PostRunAppraisal),
    mergeMap((action) => onPostRunAppraisal(action, dependencies))
  );
}

export const onPostRunAppraisal: (action: PostRunAppraisalActionType, dependencies: AppDependencies) 
  => Observable<PostRunAppraisalCompletedActionType | PostRunAppraisalFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postRunAppraisal$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postRunAppraisalCompleted(response.response as PostRunAppraisalResponse);
    }),
    catchError(error => {
      return of(postRunAppraisalFailed(error.response.message));
    })
  );
}