import Action from './baseAction';
import PostRegisterResponse from '../../common/types/messages/PostRegisterResponse';
import PostRegisterRequest from '../../common/types/messages/PostRegisterRequest';
import PostClearUserRequest from '../../common/types/messages/PostClearUserRequest';
import PostClearUserResponse from '../../common/types/messages/PostClearUserResponse';
import PostLoginRequest from '../../common/types/messages/PostLoginRequest';
import PostLoginResponse from '../../common/types/messages/PostLoginResponse';
import PostResetPasswordRequest from '../../common/types/messages/PostResetPasswordRequest';
import PostResetPasswordResponse from '../../common/types/messages/PostResetPasswordResponse';

export enum LoginActionTypes {
  RegisterUser = 'REGISTER_USER',
  RegisterUserCompleted = 'REGISTER_USER_COMPLETED',
  RegisterUserFailed = 'REGUSTER_USER_FAILED',
  ClearUser = 'CLEAR_USER',
  ClearUserCompleted = 'CLEAR_USER_COMPLETED',
  ClearUserFailed = 'CLEAR_USER_FAILED',
  Login = 'LOGIN',
  LoginCompleted = 'LOGIN_COMPLETED',
  LoginFailed = 'LOGIN_FAILED',
  ResetPassword = 'RESET_PASSWORD',
  ResetPasswordCompleted = 'RESET_PASSWORD_COMPLETED',
  ResetPasswordFailed = 'RESET_PASSWORD_FAILED',
  UpdateRegisterForm = 'UPDATE_REGISTER_FORM',
  Logout = 'LOGOUT'
}

export type RegisterUserPayloadType = { request: PostRegisterRequest; };
export type RegisterUserActionType = Action<LoginActionTypes.RegisterUser, RegisterUserPayloadType>;
export const registerUser = (request: PostRegisterRequest): RegisterUserActionType => ({type: LoginActionTypes.RegisterUser, payload: { request } });

export type RegisterUserCompletedPayloadType = { response: PostRegisterResponse; };
export type RegisterUserCompletedActionType = Action<LoginActionTypes.RegisterUserCompleted, RegisterUserCompletedPayloadType>;
export const registerUserCompleted = (response: PostRegisterResponse): RegisterUserCompletedActionType => ({type: LoginActionTypes.RegisterUserCompleted, payload: { response } });

export type RegisterUserFailedPayloadType = { error: Error; };
export type RegisterUserFailedActionType = Action<LoginActionTypes.RegisterUserFailed, RegisterUserFailedPayloadType>;
export const registerUserFailed = (error: Error): RegisterUserFailedActionType => ({type: LoginActionTypes.RegisterUserFailed, payload: { error } });

export type ClearUserPayloadType = { request: PostClearUserRequest; };
export type ClearUserActionType = Action<LoginActionTypes.ClearUser, ClearUserPayloadType>;
export const clearUser = (request: PostClearUserRequest): ClearUserActionType => ({type: LoginActionTypes.ClearUser, payload: { request } });

export type ClearUserCompletedPayloadType = { response: PostClearUserResponse; };
export type ClearUserCompletedActionType = Action<LoginActionTypes.ClearUserCompleted, ClearUserCompletedPayloadType>;
export const clearUserCompleted = (response: PostClearUserResponse): ClearUserCompletedActionType => ({type: LoginActionTypes.ClearUserCompleted, payload: { response } });

export type ClearUserFailedPayloadType = { error: Error; };
export type ClearUserFailedActionType = Action<LoginActionTypes.ClearUserFailed, ClearUserFailedPayloadType>;
export const clearUserFailed = (error: Error): ClearUserFailedActionType => ({type: LoginActionTypes.ClearUserFailed, payload: { error } });

export type LogoutPayloadType = { };
export type LogoutActionType = Action<LoginActionTypes.Logout, LogoutPayloadType>;
export const logout = (): LogoutActionType => ({type: LoginActionTypes.Logout, payload: { } });

export type LoginPayloadType = { request: PostLoginRequest; };
export type LoginActionType = Action<LoginActionTypes.Login, LoginPayloadType>;
export const login = (request: PostLoginRequest): LoginActionType => ({type: LoginActionTypes.Login, payload: { request } });

export type LoginCompletedPayloadType = { response: PostLoginResponse; };
export type LoginCompletedActionType = Action<LoginActionTypes.LoginCompleted, LoginCompletedPayloadType>;
export const loginCompleted = (response: PostLoginResponse): LoginCompletedActionType => ({type: LoginActionTypes.LoginCompleted, payload: { response } });

export type LoginFailedPayloadType = { error: Error; };
export type LoginFailedActionType = Action<LoginActionTypes.LoginFailed, LoginFailedPayloadType>;
export const loginFailed = (error: Error): LoginFailedActionType => ({type: LoginActionTypes.LoginFailed, payload: { error } });

export type ResetPasswordPayloadType = { request: PostResetPasswordRequest; };
export type ResetPasswordActionType = Action<LoginActionTypes.ResetPassword, ResetPasswordPayloadType>;
export const resetPassword = (request: PostResetPasswordRequest): ResetPasswordActionType => ({type: LoginActionTypes.ResetPassword, payload: { request } });

export type ResetPasswordCompletedPayloadType = { response: PostResetPasswordResponse; };
export type ResetPasswordCompletedActionType = Action<LoginActionTypes.ResetPasswordCompleted, ResetPasswordCompletedPayloadType>;
export const resetPasswordCompleted = (response: PostResetPasswordResponse): ResetPasswordCompletedActionType => ({type: LoginActionTypes.ResetPasswordCompleted, payload: { response } });

export type ResetPasswordFailedPayloadType = { error: Error; };
export type ResetPasswordFailedActionType = Action<LoginActionTypes.ResetPasswordFailed, ResetPasswordFailedPayloadType>;
export const resetPasswordFailed = (error: Error): ResetPasswordFailedActionType => ({type: LoginActionTypes.ResetPasswordFailed, payload: { error } });

export type UpdateRegisterFormPayloadType = { uplandUsername: string; };
export type UpdateRegisterFormActionType = Action<LoginActionTypes.UpdateRegisterForm, UpdateRegisterFormPayloadType>;
export const updateRegisterForm = (uplandUsername: string): UpdateRegisterFormActionType => ({type: LoginActionTypes.UpdateRegisterForm, payload: { uplandUsername } });