import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetMapResponse from '../../common/types/messages/GetMapResponse';
import {
  MappingActionTypes,
  GetMapActionType,
  GetMapCompletedActionType,
  GetMapFailedActionType,
  PostCreateMapActionType,
  PostCreateMapCompletedActionType,
  PostCreateMapFailedActionType,
  getMapCompleted,
  getMapFailed,
  postCreateMapCompleted,
  postCreateMapFailed
} from '../actions/mappingActions';

export const getMapEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(MappingActionTypes.GetMap),
    mergeMap((action) => onGetMap(action, dependencies))
  );
}

export const onGetMap: (action: GetMapActionType, dependencies: AppDependencies) 
  => Observable<GetMapCompletedActionType | GetMapFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getMap$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return getMapCompleted(response.response as GetMapResponse);
    }),
    catchError(error => {
      return of(getMapFailed(error.response.message));
    })
  );
}

export const postCreateMapEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(MappingActionTypes.PostCreateMap),
    mergeMap((action) => onPostCreateMap(action, dependencies))
  );
}

export const onPostCreateMap: (action: PostCreateMapActionType, dependencies: AppDependencies) 
  => Observable<PostCreateMapCompletedActionType | PostCreateMapFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postCreateMap$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postCreateMapCompleted(response.response as GetMapResponse);
    }),
    catchError(error => {
      return of(postCreateMapFailed(error.response.message));
    })
  );
}