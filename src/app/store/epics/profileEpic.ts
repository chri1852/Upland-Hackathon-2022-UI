import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetRegisteredUserRunCountResponse from '../../common/types/messages/GetRegisteredUserRunCountResponse';
import GetUserProfileRequest from '../../common/types/messages/GetUserProfileRequest';
import GetUserProfileResponse from '../../common/types/messages/GetUserProfileResponse';

import {
  ProfileActionTypes,
  GetUserProfileActionType,
  GetUserProfileByUsernameActionType,
  GetUserProfileCompletedActionType,
  GetUserProfileFailedActionType,
  getUserProfileCompleted,
  getUserProfileFailed,
  GetUserProfileByUsernameCompletedActionType,
  GetUserProfileByUsernameFailedActionType,
  getUserProfileByUsernameCompleted,
  getUserProfileByUsernameFailed,
  GetUserRunCountActionType,
  GetUserRunCountCompletedActionType,
  GetUserRunCountFailedActionType,
  getUserRunCountCompleted,
  getUserRunCountFailed
} from '../actions/profileActions';

export const getUserProfileEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(ProfileActionTypes.GetUserProfile),
    mergeMap((action) => onGetUserProfile(action, dependencies))
  );
}

export const onGetUserProfile: (action: GetUserProfileActionType, dependencies: AppDependencies) 
  => Observable<GetUserProfileCompletedActionType | GetUserProfileFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getUserProfile$();

  return callResponse$.pipe(
    map(response => {
      return getUserProfileCompleted(response.response as GetUserProfileResponse);
    }),
    catchError(error => {
      return of(getUserProfileFailed(error.response.message));
    })
  );
}

export const getUserProfileByUsernameEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(ProfileActionTypes.GetUserProfileByUsername),
    mergeMap((action) => onGetUserProfileByUsername(action, dependencies))
  );
}

export const onGetUserProfileByUsername: (action: GetUserProfileByUsernameActionType, dependencies: AppDependencies) 
  => Observable<GetUserProfileByUsernameCompletedActionType | GetUserProfileByUsernameFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getUserProfileByUsername$(action.payload?.request as GetUserProfileRequest);

  return callResponse$.pipe(
    map(response => {
      return getUserProfileByUsernameCompleted(response.response as GetUserProfileResponse);
    }),
    catchError(error => {
      return of(getUserProfileByUsernameFailed(error.response.message));
    })
  );
}

export const getUserRunCountEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(ProfileActionTypes.GetUserRunCount),
    mergeMap((action) => onGetUserRunCount(action, dependencies))
  );
}

export const onGetUserRunCount: (action: GetUserRunCountActionType, dependencies: AppDependencies) 
  => Observable<GetUserRunCountCompletedActionType | GetUserRunCountFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getUserRunCount$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return getUserRunCountCompleted(response.response as GetRegisteredUserRunCountResponse);
    }),
    catchError(error => {
      return of(getUserRunCountFailed(error.response));
    })
  );
}