import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetAnnouncementsResponse from '../../common/types/messages/GetAnnouncementsResponse';
import GetBlockchainStatusResponse from '../../common/types/messages/GetBlockchainStatusResponse';
import GetCollectionsResponse from '../../common/types/messages/GetCollectionsResponse';
import GetNeighborhoodsResponse from '../../common/types/messages/GetNeighborhoodsResponse';
import GetStatsResponse from '../../common/types/messages/GetStatsResponse';
import GetStreetsResponse from '../../common/types/messages/GetStreetsResponse';
import {
  InfoActionTypes,
  GetCollectionsActionType,
  GetCollectionsCompletedActionType,
  GetCollectionsFailedActionType,
  GetNeighborhoodsActionType,
  GetNeighborhoodsCompletedActionType,
  GetNeighborhoodsFailedActionType,
  getCollectionsCompleted,
  getCollectionsFailed,
  getNeighborhoodsCompleted,
  getNeighborhoodsFailed,
  GetBlockchainStatusActionType,
  GetBlockchainStatusCompletedActionType,
  GetBlockchainStatusFailedActionType,
  getBlockchainStatusCompleted,
  getBlockchainStatusFailed,
  GetStreetsActionType,
  GetStreetsCompletedActionType,
  GetStreetsFailedActionType,
  getStreetsCompleted,
  getStreetsFailed,
  GetStatsActionType,
  GetStatsCompletedActionType,
  GetStatsFailedActionType,
  getStatsCompleted,
  getStatsFailed,
  GetAnnouncementsActionType,
  GetAnnouncementsCompletedActionType,
  GetAnnouncementsFailedActionType,
  getAnnouncementsCompleted,
  getAnnouncementsFailed
} from '../actions/infoActions';

export const getCollectionsEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetCollections),
    mergeMap((action) => onGetCollections(action, dependencies))
  );
}

export const onGetCollections: (action: GetCollectionsActionType, dependencies: AppDependencies) 
  => Observable<GetCollectionsCompletedActionType | GetCollectionsFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getCollections$();

  return callResponse$.pipe(
    map(response => {
      return getCollectionsCompleted(response.response as GetCollectionsResponse);
    }),
    catchError(error => {
      return of(getCollectionsFailed(error.response.message));
    })
  );
}

export const getNeighborhoodsEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetNeighborhoods),
    mergeMap((action) => onGetNeighborhoods(action, dependencies))
  );
}

export const onGetNeighborhoods: (action: GetNeighborhoodsActionType, dependencies: AppDependencies) 
  => Observable<GetNeighborhoodsCompletedActionType | GetNeighborhoodsFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getNeighborhoods$();

  return callResponse$.pipe(
    map(response => {
      return getNeighborhoodsCompleted(response.response as GetNeighborhoodsResponse);
    }),
    catchError(error => {
      return of(getNeighborhoodsFailed(error.response.message));
    })
  );
}

export const getStreetsEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetStreets),
    mergeMap((action) => onGetStreets(action, dependencies))
  );
}

export const onGetStreets: (action: GetStreetsActionType, dependencies: AppDependencies) 
  => Observable<GetStreetsCompletedActionType | GetStreetsFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getStreets$();

  return callResponse$.pipe(
    map(response => {
      return getStreetsCompleted(response.response as GetStreetsResponse);
    }),
    catchError(error => {
      return of(getStreetsFailed(error.response.message));
    })
  );
}

export const getStatsEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetStats),
    mergeMap((action) => onGetStats(action, dependencies))
  );
}

export const onGetStats: (action: GetStatsActionType, dependencies: AppDependencies) 
  => Observable<GetStatsCompletedActionType | GetStatsFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getStatsByType$(action.payload!.type);

  return callResponse$.pipe(
    map(response => {
      return getStatsCompleted(response.response as GetStatsResponse);
    }),
    catchError(error => {
      return of(getStatsFailed(error.response.message));
    })
  );
}

export const getBlockchainStatusEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetBlockchainStatus),
    mergeMap((action) => onGetBlockchainStatus(action, dependencies))
  );
}

export const onGetBlockchainStatus: (action: GetBlockchainStatusActionType, dependencies: AppDependencies) 
  => Observable<GetBlockchainStatusCompletedActionType | GetBlockchainStatusFailedActionType> = (action, { apiService }) => {

  const callResponse$ = apiService.getBlockchainStatus$();

  return callResponse$.pipe(
    map(response => {
      return getBlockchainStatusCompleted(response.response as GetBlockchainStatusResponse);
    }),
    catchError(error => {
      return of(getBlockchainStatusFailed(error.response.message));
    })
  );
}

export const getAnnouncementsEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(InfoActionTypes.GetAnnouncements),
    mergeMap((action) => onGetAnnouncements(action, dependencies))
  );
}

export const onGetAnnouncements: (action: GetAnnouncementsActionType, dependencies: AppDependencies) 
  => Observable<GetAnnouncementsCompletedActionType | GetAnnouncementsFailedActionType> = (action, { apiService }) => {

  const callResponse$ = apiService.getAnnouncements$();

  return callResponse$.pipe(
    map(response => {
      return getAnnouncementsCompleted(response.response as GetAnnouncementsResponse);
    }),
    catchError(error => {
      return of(getAnnouncementsFailed(error.response.message));
    })
  );
}