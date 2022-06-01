import Action from './baseAction';
import GetLastAppraisalRequest from '../../common/types/messages/GetLastAppraisalRequest';
import GetLastAppraisalResponse from '../../common/types/messages/GetLastAppraisalResponse';
import PostRunAppraisalRequest from '../../common/types/messages/PostRunAppraisalRequest';
import PostRunAppraisalResponse from '../../common/types/messages/PostRunAppraisalResponse';

export enum AppraisalActionTypes {
  GetLastAppraisal = 'GET_LAST_APPRAISAL',
  GetLastAppraisalCompleted = 'GET_LAST_APPRAISAL_COMPLETED',
  GetLastAppraisalFailed = 'GET_LAST_APPRAISAL_FAILED',
  PostRunAppraisal = 'POST_RUN_APPRAISAL',
  PostRunAppraisalCompleted = 'POST_RUN_APPRAISAL_COMPLETED',
  PostRunAppraisalFailed = 'POST_RUN_APPRAISAL_FAILED',
}

export type GetLastAppraisalPayloadType = { request: GetLastAppraisalRequest };
export type GetLastAppraisalActionType = Action<AppraisalActionTypes.GetLastAppraisal, GetLastAppraisalPayloadType>;
export const getLastAppraisal = (request: GetLastAppraisalRequest): GetLastAppraisalActionType => ({type: AppraisalActionTypes.GetLastAppraisal, payload: { request } });

export type GetLastAppraisalCompletedPayloadType = { response: GetLastAppraisalResponse; };
export type GetLastAppraisalCompletedActionType = Action<AppraisalActionTypes.GetLastAppraisalCompleted, GetLastAppraisalCompletedPayloadType>;
export const getLastAppraisalCompleted = (response: GetLastAppraisalResponse): GetLastAppraisalCompletedActionType => ({type: AppraisalActionTypes.GetLastAppraisalCompleted, payload: { response } });

export type GetLastAppraisalFailedPayloadType = { error: Error; };
export type GetLastAppraisalFailedActionType = Action<AppraisalActionTypes.GetLastAppraisalFailed, GetLastAppraisalFailedPayloadType>;
export const getLastAppraisalFailed = (error: Error): GetLastAppraisalFailedActionType => ({type: AppraisalActionTypes.GetLastAppraisalFailed, payload: { error } });

export type PostRunAppraisalPayloadType = { request: PostRunAppraisalRequest };
export type PostRunAppraisalActionType = Action<AppraisalActionTypes.PostRunAppraisal, PostRunAppraisalPayloadType>;
export const postRunAppraisal = (request: PostRunAppraisalRequest): PostRunAppraisalActionType => ({type: AppraisalActionTypes.PostRunAppraisal, payload: { request } });

export type PostRunAppraisalCompletedPayloadType = { response: PostRunAppraisalResponse; };
export type PostRunAppraisalCompletedActionType = Action<AppraisalActionTypes.PostRunAppraisalCompleted, PostRunAppraisalCompletedPayloadType>;
export const postRunAppraisalCompleted = (response: PostRunAppraisalResponse): PostRunAppraisalCompletedActionType => ({type: AppraisalActionTypes.PostRunAppraisalCompleted, payload: { response } });

export type PostRunAppraisalFailedPayloadType = { error: Error; };
export type PostRunAppraisalFailedActionType = Action<AppraisalActionTypes.PostRunAppraisalFailed, PostRunAppraisalFailedPayloadType>;
export const postRunAppraisalFailed = (error: Error): PostRunAppraisalFailedActionType => ({type: AppraisalActionTypes.PostRunAppraisalFailed, payload: { error } });
