import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetPropertyHistoryResponse from '../../common/types/messages/GetPropertyHistoryResponse';
import PostPropertiesForSaleResponse from '../../common/types/messages/PostPropertiesForSaleResponse';
import PostPropertiesUnmintedResponse from '../../common/types/messages/PostPropertiesUnmintedResponse';
import Battle from '../../common/types/Battle';
import {
  PropertyActionTypes,
  PostPropertiesForSaleActionType,
  PostPropertiesForSaleCompletedActionType,
  PostPropertiesForSaleFailedActionType,
  postPropertiesForSaleCompleted,
  postPropertiesForSaleFailed,
  PostPropertiesUnmintedActionType,
  PostPropertiesUnmintedCompletedActionType,
  PostPropertiesUnmintedFailedActionType,
  postPropertiesUnmintedCompleted,
  postPropertiesUnmintedFailed,
  GetBattleHistoryActionType,
  GetBattleHistoryCompletedActionType,
  GetBattleHistoryFailedActionType,
  getBattleHistoryCompleted,
  getBattleHistoryFailed,
} from '../actions/propertyActions';

export const postPropertiesForSaleEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(PropertyActionTypes.PostPropertiesForSale),
    mergeMap((action) => onPostPropertiesForSale(action, dependencies))
  );
}

export const onPostPropertiesForSale: (action: PostPropertiesForSaleActionType, dependencies: AppDependencies) 
  => Observable<PostPropertiesForSaleCompletedActionType | PostPropertiesForSaleFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postPropertiesForSale$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postPropertiesForSaleCompleted(response.response as PostPropertiesForSaleResponse);
    }),
    catchError(error => {
      return of(postPropertiesForSaleFailed(error.response.message));
    })
  );
}

export const postPropertiesUnmintedEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(PropertyActionTypes.PostPropertiesUnminted),
    mergeMap((action) => onPostPropertiesUnminted(action, dependencies))
  );
}

export const onPostPropertiesUnminted: (action: PostPropertiesUnmintedActionType, dependencies: AppDependencies) 
  => Observable<PostPropertiesUnmintedCompletedActionType | PostPropertiesUnmintedFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postPropertiesUnminted$();

  return callResponse$.pipe(
    map(response => {
      return postPropertiesUnmintedCompleted(response.response as Battle[]);
    }),
    catchError(error => {
      return of(postPropertiesUnmintedFailed(error.response.message));
    })
  );
}

export const getBattleHistoryEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(PropertyActionTypes.GetBattleHistory),
    mergeMap((action) => onGetBattleHistory(action, dependencies))
  );
}

export const onGetBattleHistory: (action: GetBattleHistoryActionType, dependencies: AppDependencies) 
  => Observable<GetBattleHistoryCompletedActionType | GetBattleHistoryFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getBattleHistory$(action.payload!.battleAssetId);

  return callResponse$.pipe(
    map(response => {
      return getBattleHistoryCompleted(response.response as Battle[]);
    }),
    catchError(error => {
      return of(getBattleHistoryFailed());
    })
  );
}
