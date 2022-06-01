import Action from './baseAction';
import GetUserProfileRequest from '../../common/types/messages/GetUserProfileRequest';
import GetUserProfileResponse from '../../common/types/messages/GetUserProfileResponse';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import ProfileNFTFilters from '../../common/types/ProfileNFTFilters';
import ProfileSparkHistoryFilters from '../../common/types/ProfileSparkHistoryFilters';
import GetRegisteredUserRunCountResponse from '../../common/types/messages/GetRegisteredUserRunCountResponse';
import GetRegisteredUserRunCountRequest from '../../common/types/messages/GetRegisteredUserRunCountRequest';

export enum ProfileActionTypes {
  GetUserProfile = 'GET_USER_PROFILE',
  GetUserProfileByUsername = 'GET_USER_BY_USERNMAME_PROFILE',
  GetUserProfileCompleted = 'GET_USER_PROFILE_COMPLETED',
  GetUserProfileFailed = 'GET_USER_PROFILE_FAILED',
  GetUserProfileByUsernameCompleted = 'GET_USER_PROFILE_BY_USERNAME_COMPLETED',
  GetUserProfileByUsernameFailed = 'GET_USER_PROFILE_BY_USERNAME_FAILED',
  UpdateLoggedInFilters = 'UPDATE_LOGGED_IN_FILTERS',
  UpdateLookedUpFilters = 'UPDATE_LOOKED_UP_FILTERS',
  UpdateLoggedInNFTFilters = 'UPDATE_LOGGED_IN_NFT_FILTERS',
  UpdateLookedUpNFTFilters = 'UPDATE_LOOKED_UP_NFT_FILTERS',
  GetUserRunCount = 'GET_USER_RUN_COUNT',
  GetUserRunCountCompleted = 'GET_USER_RUN_COUNT_COMPLETED',
  GetUserRunCountFailed = 'GET_USER_RUN_COUNT_FAILED',
  UpdateLoggedInView = 'UPDATE_LOGGED_IN_VIEW',
  UpdateLookedUpView = 'UPDATE_LOOKED_UP_VIEW',
  UpdateLoggedInSparkHistoryFilters = 'UPDATE_LOGGED_IN_SPARK_HISTORY_FILTERS',
  UpdateLookedUpSparkHistoryFilters = 'UPDATE_LOOKED_UP_SPARK_HISTORY_FILTERS'
}

export type GetUserProfilePayloadType = { };
export type GetUserProfileActionType = Action<ProfileActionTypes.GetUserProfile, GetUserProfilePayloadType>;
export const getUserProfile = (): GetUserProfileActionType => ({type: ProfileActionTypes.GetUserProfile, payload: { } });

export type GetUserProfileByUsernamePayloadType = { request: GetUserProfileRequest; };
export type GetUserProfileByUsernameActionType = Action<ProfileActionTypes.GetUserProfileByUsername, GetUserProfileByUsernamePayloadType>;
export const getUserProfileByUsername = (request: GetUserProfileRequest): GetUserProfileByUsernameActionType => ({type: ProfileActionTypes.GetUserProfileByUsername, payload: { request } });

export type GetUserProfileCompletedPayloadType = { response: GetUserProfileResponse; };
export type GetUserProfileCompletedActionType = Action<ProfileActionTypes.GetUserProfileCompleted, GetUserProfileCompletedPayloadType>;
export const getUserProfileCompleted = (response: GetUserProfileResponse): GetUserProfileCompletedActionType => ({type: ProfileActionTypes.GetUserProfileCompleted, payload: { response } });

export type GetUserProfileFailedPayloadType = { error: Error; };
export type GetUserProfileFailedActionType = Action<ProfileActionTypes.GetUserProfileFailed, GetUserProfileFailedPayloadType>;
export const getUserProfileFailed = (error: Error): GetUserProfileFailedActionType => ({type: ProfileActionTypes.GetUserProfileFailed, payload: { error } });

export type GetUserProfileByUsernameCompletedPayloadType = { response: GetUserProfileResponse; };
export type GetUserProfileByUsernameCompletedActionType = Action<ProfileActionTypes.GetUserProfileByUsernameCompleted, GetUserProfileByUsernameCompletedPayloadType>;
export const getUserProfileByUsernameCompleted = (response: GetUserProfileResponse): GetUserProfileByUsernameCompletedActionType => ({type: ProfileActionTypes.GetUserProfileByUsernameCompleted, payload: { response } });

export type GetUserProfileByUsernameFailedPayloadType = { error: Error; };
export type GetUserProfileByUsernameFailedActionType = Action<ProfileActionTypes.GetUserProfileByUsernameFailed, GetUserProfileByUsernameFailedPayloadType>;
export const getUserProfileByUsernameFailed = (error: Error): GetUserProfileByUsernameFailedActionType => ({type: ProfileActionTypes.GetUserProfileByUsernameFailed, payload: { error } });

export type UpdateLoggedInFiltersPayloadType = { filters: ProfilePropertyFilters };
export type UpdateLoggedInFiltersActionType = Action<ProfileActionTypes.UpdateLoggedInFilters, UpdateLoggedInFiltersPayloadType>;
export const updateLoggedInFilters = (filters: ProfilePropertyFilters): UpdateLoggedInFiltersActionType => ({type: ProfileActionTypes.UpdateLoggedInFilters, payload: { filters } });

export type UpdateLookedUpFiltersPayloadType = { filters: ProfilePropertyFilters };
export type UpdateLookedUpFiltersActionType = Action<ProfileActionTypes.UpdateLookedUpFilters, UpdateLookedUpFiltersPayloadType>;
export const updateLookedUpFilters = (filters: ProfilePropertyFilters): UpdateLookedUpFiltersActionType => ({type: ProfileActionTypes.UpdateLookedUpFilters, payload: { filters } });

export type UpdateLoggedInNFTFiltersPayloadType = { filters: ProfileNFTFilters };
export type UpdateLoggedInNFTFiltersActionType = Action<ProfileActionTypes.UpdateLoggedInNFTFilters, UpdateLoggedInNFTFiltersPayloadType>;
export const updateLoggedInNFTFilters = (filters: ProfileNFTFilters): UpdateLoggedInNFTFiltersActionType => ({type: ProfileActionTypes.UpdateLoggedInNFTFilters, payload: { filters } });

export type UpdateLookedUpNFTFiltersPayloadType = { filters: ProfileNFTFilters };
export type UpdateLookedUpNFTFiltersActionType = Action<ProfileActionTypes.UpdateLookedUpNFTFilters, UpdateLookedUpNFTFiltersPayloadType>;
export const updateLookedUpNFTFilters = (filters: ProfileNFTFilters): UpdateLookedUpNFTFiltersActionType => ({type: ProfileActionTypes.UpdateLookedUpNFTFilters, payload: { filters } });

export type GetUserRunCountPayloadType = { request: GetRegisteredUserRunCountRequest };
export type GetUserRunCountActionType = Action<ProfileActionTypes.GetUserRunCount, GetUserRunCountPayloadType>;
export const getUserRunCount = (request: GetRegisteredUserRunCountRequest): GetUserRunCountActionType => ({type: ProfileActionTypes.GetUserRunCount, payload: { request } });

export type GetUserRunCountCompletedPayloadType = { response: GetRegisteredUserRunCountResponse; };
export type GetUserRunCountCompletedActionType = Action<ProfileActionTypes.GetUserRunCountCompleted, GetUserRunCountCompletedPayloadType>;
export const getUserRunCountCompleted = (response: GetRegisteredUserRunCountResponse): GetUserRunCountCompletedActionType => ({type: ProfileActionTypes.GetUserRunCountCompleted, payload: { response } });

export type GetUserRunCountFailedPayloadType = { error: Error; };
export type GetUserRunCountFailedActionType = Action<ProfileActionTypes.GetUserRunCountFailed, GetUserRunCountFailedPayloadType>;
export const getUserRunCountFailed = (error: Error): GetUserRunCountFailedActionType => ({type: ProfileActionTypes.GetUserRunCountFailed, payload: { error } });

export type UpdateLoggedInViewPayloadType = { view: string, category: string };
export type UpdateLoggedInViewActionType = Action<ProfileActionTypes.UpdateLoggedInView, UpdateLoggedInViewPayloadType>;
export const updateLoggedInView = (view: string, category: string): UpdateLoggedInViewActionType => ({type: ProfileActionTypes.UpdateLoggedInView, payload: { view: view, category: category } });

export type UpdateLookedUpViewPayloadType = { view: string, category: string };
export type UpdateLookedUpViewActionType = Action<ProfileActionTypes.UpdateLookedUpView, UpdateLookedUpViewPayloadType>;
export const updateLookedUpView = (view: string, category: string): UpdateLookedUpViewActionType => ({type: ProfileActionTypes.UpdateLookedUpView, payload: { view: view, category: category } });

export type UpdateLoggedInSparkHistoryFiltersPayloadType = { filters: ProfileSparkHistoryFilters };
export type UpdateLoggedInSparkHistoryFiltersActionType = Action<ProfileActionTypes.UpdateLoggedInSparkHistoryFilters, UpdateLoggedInSparkHistoryFiltersPayloadType>;
export const updateLoggedInSparkHistoryFilters = (filters: ProfileSparkHistoryFilters): UpdateLoggedInSparkHistoryFiltersActionType => ({type: ProfileActionTypes.UpdateLoggedInSparkHistoryFilters, payload: { filters } });

export type UpdateLookedUpSparkHistoryFiltersPayloadType = { filters: ProfileSparkHistoryFilters };
export type UpdateLookedUpSparkHistoryFiltersActionType = Action<ProfileActionTypes.UpdateLookedUpSparkHistoryFilters, UpdateLookedUpSparkHistoryFiltersPayloadType>;
export const updateLookedUpSparkHistoryFilters = (filters: ProfileSparkHistoryFilters): UpdateLookedUpSparkHistoryFiltersActionType => ({type: ProfileActionTypes.UpdateLookedUpSparkHistoryFilters, payload: { filters } });
