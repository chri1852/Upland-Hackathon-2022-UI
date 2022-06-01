import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import PostClearUserRequest from '../../common/types/messages/PostClearUserRequest';
import PostClearUserResponse from '../../common/types/messages/PostClearUserResponse';
import PostLoginRequest from '../../common/types/messages/PostLoginRequest';
import PostRegisterRequest from '../../common/types/messages/PostRegisterRequest';
import PostRegisterResponse from '../../common/types/messages/PostRegisterResponse';
import PostLoginResponse from '../../common/types/messages/PostLoginResponse';
import PostResetPasswordRequest from '../../common/types/messages/PostResetPasswordRequest';
import PostResetPasswordResponse from '../../common/types/messages/PostResetPasswordResponse';

import {
  LoginActionTypes,
  RegisterUserActionType,
  RegisterUserCompletedActionType,
  registerUserCompleted,
  RegisterUserFailedActionType,
  registerUserFailed,
  ClearUserActionType,
  ClearUserCompletedActionType,
  ClearUserFailedActionType,
  clearUserCompleted,
  clearUserFailed,
  LoginActionType,
  LoginCompletedActionType,
  LoginFailedActionType,
  loginCompleted,
  loginFailed,
  ResetPasswordActionType,
  ResetPasswordCompletedActionType,
  ResetPasswordFailedActionType,
  resetPasswordFailed,
  resetPasswordCompleted
} from '../actions/loginActions';

export const registerUserEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(LoginActionTypes.RegisterUser),
    mergeMap((action) => onRegisterUser(action, dependencies))
  );
}

export const onRegisterUser: (action: RegisterUserActionType, dependencies: AppDependencies) 
  => Observable<RegisterUserCompletedActionType | RegisterUserFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postRegisterUser$(action.payload?.request as PostRegisterRequest);

  return callResponse$.pipe(
    map(response => {
      return registerUserCompleted(response.response as PostRegisterResponse);
    }),
    catchError(error => {
      return of(registerUserFailed(error.response.message));
    })
  );
}

export const loginEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(LoginActionTypes.Login),
    mergeMap((action) => onLogin(action, dependencies))
  );
}

export const onLogin: (action: LoginActionType, dependencies: AppDependencies) 
  => Observable<LoginCompletedActionType | LoginFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postLogin$(action.payload?.request as PostLoginRequest);

  return callResponse$.pipe(
    map(response => {
      return loginCompleted(response.response as PostLoginResponse);
    }),
    catchError(error => {
      return of(loginFailed(error.response.message));
    })
  );
}

export const resetPasswordEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(LoginActionTypes.ResetPassword),
    mergeMap((action) => onResetPassword(action, dependencies))
  );
}

export const onResetPassword: (action: ResetPasswordActionType, dependencies: AppDependencies) 
  => Observable<ResetPasswordCompletedActionType | ResetPasswordFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postResetPassword$(action.payload?.request as PostResetPasswordRequest);

  return callResponse$.pipe(
    map(response => {
      return resetPasswordCompleted(response.response as PostResetPasswordResponse);
    }),
    catchError(error => {
      return of(resetPasswordFailed(error.response.message));
    })
  );
}

export const clearUserEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(LoginActionTypes.ClearUser),
    mergeMap((action) => onClearUser(action, dependencies))
  );
}

export const onClearUser: (action: ClearUserActionType, dependencies: AppDependencies) 
  => Observable<ClearUserCompletedActionType | ClearUserFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postClearUser$(action.payload?.request as PostClearUserRequest);

  return callResponse$.pipe(
    map(response => {
      return clearUserCompleted(response.response as PostClearUserResponse);
    }),
    catchError(error => {
      return of(clearUserFailed(error.response.message));
    })
  );
}