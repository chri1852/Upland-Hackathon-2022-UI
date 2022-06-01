import { Reducer } from 'redux';
import { LoginState } from '../states/loginState';
import {
  ClearUserActionType,
  ClearUserCompletedActionType,
  ClearUserFailedActionType,
  LoginActionTypes,
  RegisterUserActionType,
  RegisterUserCompletedActionType,
  RegisterUserFailedActionType,
  LoginActionType,
  LoginCompletedActionType,
  LoginFailedActionType,
  UpdateRegisterFormActionType,
  ResetPasswordActionType,
  ResetPasswordCompletedActionType,
  ResetPasswordFailedActionType,
  LogoutActionType
} from '../actions/loginActions';

export type LoginActions = 
  RegisterUserActionType
  | RegisterUserCompletedActionType
  | RegisterUserFailedActionType
  | ClearUserActionType
  | ClearUserCompletedActionType
  | ClearUserFailedActionType
  | LogoutActionType
  | LoginActionType
  | LoginCompletedActionType
  | LoginFailedActionType
  | UpdateRegisterFormActionType
  | ResetPasswordActionType
  | ResetPasswordCompletedActionType
  | ResetPasswordFailedActionType

export const initialState: LoginState = {
  uplandUsername: '',
  verifyPropAddress: '',
  verifyPropPrice: 0,
  isLoading: false,
  verificationNeeded: false,
  hasError: false,
  errorMessage: '',
  authTokenSet: window.localStorage.getItem("GJSHackathonAuthToken") ? true : false,
  mustEnterCode: false,
  otpCode: ''
}

export const LoginReducer: Reducer<LoginState> = (state = initialState, action: LoginActions): LoginState => {
  switch(action.type) {
    case LoginActionTypes.RegisterUser:
      return {
        ...state,
        uplandUsername: action.payload!.request.username,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case LoginActionTypes.RegisterUserCompleted:
      if (action.payload?.response?.authToken) {
        window.localStorage.setItem("GJSHackathonAuthToken", action.payload.response.authToken);
      }
      return {
        ...state,
        verifyPropAddress: action.payload!.response.address,
        verifyPropPrice: action.payload!.response.price,
        isLoading: false,
        verificationNeeded: action.payload!.response.price !== 0,
        hasError: action.payload!.response.logicError,
        errorMessage: action.payload!.response.message,
        authTokenSet: action.payload?.response?.authToken ? true : false
      };
    case LoginActionTypes.RegisterUserFailed:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload!.error as any,
      };
    case LoginActionTypes.ClearUser:
      return {
        ...state,
        uplandUsername: action.payload!.request.username,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case LoginActionTypes.ClearUserCompleted:
      return {
        ...state,
        verifyPropAddress: action.payload!.response.address,
        verifyPropPrice: action.payload!.response.price,
        isLoading: false,
        verificationNeeded: true,
        hasError: action.payload!.response.logicError,
        errorMessage: action.payload!.response.message,
      };
    case LoginActionTypes.ClearUserFailed:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload!.error.message,
      };
    case LoginActionTypes.Logout:
      window.localStorage.removeItem("GJSHackathonAuthToken");
      return initialState;
    case LoginActionTypes.Login:
      return {
        ...state,
        uplandUsername: action.payload!.request.username,
        isLoading: true,
        hasError: false,
        errorMessage: '',
        mustEnterCode: false,
        otpCode: '',
      };
    case LoginActionTypes.LoginCompleted:
      if (action.payload?.response?.authToken && !action.payload!.response!.mustEnterCode ) {
        window.localStorage.setItem("GJSHackathonAuthToken", action.payload.response.authToken);
      }
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: '',
        authTokenSet: action.payload?.response?.authToken && !action.payload!.response!.mustEnterCode ? true : false,
        mustEnterCode: action.payload!.response!.mustEnterCode,
        otpCode: action.payload!.response!.otpCode,
      };
    case LoginActionTypes.LoginFailed:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload!.error as any,
      }; 

    case LoginActionTypes.ResetPassword:
      return {
        ...state,
        uplandUsername: action.payload!.request.username,
        isLoading: true,
        hasError: false,
        errorMessage: '',
      };
    case LoginActionTypes.ResetPasswordCompleted:
      if (action.payload?.response?.authToken) {
        window.localStorage.setItem("GJSHackathonAuthToken", action.payload.response.authToken);
      }
      return {
        ...state,
        verifyPropAddress: action.payload!.response.address,
        verifyPropPrice: action.payload!.response.price,
        verificationNeeded: true,
        isLoading: false,
        hasError: action.payload!.response.logicError,
        errorMessage: action.payload!.response.message,
        authTokenSet: action.payload?.response?.authToken ? true : false
      };
    case LoginActionTypes.ResetPasswordFailed:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload!.error as any,
      }; 
      
    case LoginActionTypes.UpdateRegisterForm:
      return {
        ...state,
        uplandUsername: action.payload!.uplandUsername,
        hasError: false,
        verifyPropAddress: '',
        verifyPropPrice: 0,
        verificationNeeded: false,
      }
    default:
      return state;
  }
}

export default LoginReducer;