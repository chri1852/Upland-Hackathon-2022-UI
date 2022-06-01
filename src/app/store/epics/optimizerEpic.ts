import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetLastOptimizerRunResponse from '../../common/types/messages/GetLastOptimizerRunResponse';
import PostOptimizerRunResponse from '../../common/types/messages/PostOptimizerRunResponse';
import {
  OptimizerActionTypes,
  GetLastOptimizerRunActionType,
  GetLastOptimizerRunCompletedActionType,
  GetLastOptimizerRunFailedActionType,
  PostOptimizerRunActionType,
  PostOptimizerRunCompletedActionType,
  PostOptimizerRunFailedActionType,
  getLastOptimizerRunCompleted,
  getLastOptimizerRunFailed,
  postOptimizerRunCompleted,
  postOptimizerRunFailed
} from '../actions/optimizerActions';

export const getLastOptimizerRunEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(OptimizerActionTypes.GetLastOptimizerRun),
    mergeMap((action) => onGetLastOptimizerRun(action, dependencies))
  );
}

export const onGetLastOptimizerRun: (action: GetLastOptimizerRunActionType, dependencies: AppDependencies) 
  => Observable<GetLastOptimizerRunCompletedActionType | GetLastOptimizerRunFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getLastOptimizerRun$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return getLastOptimizerRunCompleted(response.response as GetLastOptimizerRunResponse);
    }),
    catchError(error => {
      return of(getLastOptimizerRunFailed(error.response.message));
    })
  );
}

export const postOptimizerRunEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(OptimizerActionTypes.PostOptimizerRun),
    mergeMap((action) => onPostOptimizerRun(action, dependencies))
  );
}

export const onPostOptimizerRun: (action: PostOptimizerRunActionType, dependencies: AppDependencies) 
  => Observable<PostOptimizerRunCompletedActionType | PostOptimizerRunFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postOptimizerRun$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postOptimizerRunCompleted(response.response as PostOptimizerRunResponse);
    }),
    catchError(error => {
      return of(postOptimizerRunFailed(error.response.message));
    })
  );
}