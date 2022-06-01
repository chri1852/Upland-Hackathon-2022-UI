import Action from './baseAction';
import GetLastOptimizerRunRequest from '../../common/types/messages/GetLastOptimizerRunRequest';
import GetLastOptimizerRunResponse from '../../common/types/messages/GetLastOptimizerRunResponse';
import PostOptimizerRunRequest from '../../common/types/messages/PostOptimizerRunRequest';
import PostOptimizerRunResponse from '../../common/types/messages/PostOptimizerRunResponse';

export enum OptimizerActionTypes {
  GetLastOptimizerRun = 'GET_LAST_OPTIMIZER_RUN',
  GetLastOptimizerRunCompleted = 'GET_LAST_OPTIMIZER_RUN_COMPLETED',
  GetLastOptimizerRunFailed = 'GET_LAST_OPTIMIZER_RUN_FAILED',
  PostOptimizerRun = 'POST_OPTIMIZER_RUN',
  PostOptimizerRunCompleted = 'POST_OPTIMIZER_RUN_COMPLETED',
  PostOptimizerRunFailed = 'POST_OPTIMIZER_RUN_FAILED',
  UpdateOptimizerForm = 'UPDATE_OPTIMIZER_FORM'
}

export type GetLastOptimizerRunPayloadType = { request: GetLastOptimizerRunRequest };
export type GetLastOptimizerRunActionType = Action<OptimizerActionTypes.GetLastOptimizerRun, GetLastOptimizerRunPayloadType>;
export const getLastOptimizerRun = (request: GetLastOptimizerRunRequest): GetLastOptimizerRunActionType => ({type: OptimizerActionTypes.GetLastOptimizerRun, payload: { request } });

export type GetLastOptimizerRunCompletedPayloadType = { response: GetLastOptimizerRunResponse; };
export type GetLastOptimizerRunCompletedActionType = Action<OptimizerActionTypes.GetLastOptimizerRunCompleted, GetLastOptimizerRunCompletedPayloadType>;
export const getLastOptimizerRunCompleted = (response: GetLastOptimizerRunResponse): GetLastOptimizerRunCompletedActionType => ({type: OptimizerActionTypes.GetLastOptimizerRunCompleted, payload: { response } });

export type GetLastOptimizerRunFailedPayloadType = { error: Error; };
export type GetLastOptimizerRunFailedActionType = Action<OptimizerActionTypes.GetLastOptimizerRunFailed, GetLastOptimizerRunFailedPayloadType>;
export const getLastOptimizerRunFailed = (error: Error): GetLastOptimizerRunFailedActionType => ({type: OptimizerActionTypes.GetLastOptimizerRunFailed, payload: { error } });

export type PostOptimizerRunPayloadType = { request: PostOptimizerRunRequest };
export type PostOptimizerRunActionType = Action<OptimizerActionTypes.PostOptimizerRun, PostOptimizerRunPayloadType>;
export const postOptimizerRun = (request: PostOptimizerRunRequest): PostOptimizerRunActionType => ({type: OptimizerActionTypes.PostOptimizerRun, payload: { request } });

export type PostOptimizerRunCompletedPayloadType = { response: PostOptimizerRunResponse; };
export type PostOptimizerRunCompletedActionType = Action<OptimizerActionTypes.PostOptimizerRunCompleted, PostOptimizerRunCompletedPayloadType>;
export const postOptimizerRunCompleted = (response: PostOptimizerRunResponse): PostOptimizerRunCompletedActionType => ({type: OptimizerActionTypes.PostOptimizerRunCompleted, payload: { response } });

export type PostOptimizerRunFailedPayloadType = { error: Error; };
export type PostOptimizerRunFailedActionType = Action<OptimizerActionTypes.PostOptimizerRunFailed, PostOptimizerRunFailedPayloadType>;
export const postOptimizerRunFailed = (error: Error): PostOptimizerRunFailedActionType => ({type: OptimizerActionTypes.PostOptimizerRunFailed, payload: { error } });

export type UpdateOptimizerFormPayloadType = { sortBy: string };
export type UpdateOptimizerFormActionType = Action<OptimizerActionTypes.UpdateOptimizerForm, UpdateOptimizerFormPayloadType>;
export const updateOptimizerForm = (sortBy: string): UpdateOptimizerFormActionType => ({type: OptimizerActionTypes.UpdateOptimizerForm, payload: { sortBy } });
