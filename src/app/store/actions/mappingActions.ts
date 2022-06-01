import Action from './baseAction';
import GetMapRequest from '../../common/types/messages/GetMapRequest';
import GetMapResponse from '../../common/types/messages/GetMapResponse';
import PostCreateMapRequest from '../../common/types/messages/PostCreateMapRequest';
import MappingForm from '../../common/types/MappingForm';

export enum MappingActionTypes {
  GetMap = 'GET_MAP',
  GetMapCompleted = 'GET_MAP_COMPLETED',
  GetMapFailed = 'GET_MAP_FAILED',
  PostCreateMap = 'POST_CREATE_MAP',
  PostCreateMapCompleted = 'POST_CREATE_MAP_COMPLETED',
  PostCreateMapFailed = 'POST_CREATE_MAP_FAILED',
  UpdateMappingForm = 'UPDATE_MAPPING_FORM'
}

export type GetMapPayloadType = { request: GetMapRequest };
export type GetMapActionType = Action<MappingActionTypes.GetMap, GetMapPayloadType>;
export const getMap = (request: GetMapRequest): GetMapActionType => ({type: MappingActionTypes.GetMap, payload: { request } });

export type GetMapCompletedPayloadType = { response: GetMapResponse; };
export type GetMapCompletedActionType = Action<MappingActionTypes.GetMapCompleted, GetMapCompletedPayloadType>;
export const getMapCompleted = (response: GetMapResponse): GetMapCompletedActionType => ({type: MappingActionTypes.GetMapCompleted, payload: { response } });

export type GetMapFailedPayloadType = { error: Error; };
export type GetMapFailedActionType = Action<MappingActionTypes.GetMapFailed, GetMapFailedPayloadType>;
export const getMapFailed = (error: Error): GetMapFailedActionType => ({type: MappingActionTypes.GetMapFailed, payload: { error } });

export type PostCreateMapPayloadType = { request: PostCreateMapRequest };
export type PostCreateMapActionType = Action<MappingActionTypes.PostCreateMap, PostCreateMapPayloadType>;
export const postCreateMap = (request: PostCreateMapRequest): PostCreateMapActionType => ({type: MappingActionTypes.PostCreateMap, payload: { request } });

export type PostCreateMapCompletedPayloadType = { response: GetMapResponse; };
export type PostCreateMapCompletedActionType = Action<MappingActionTypes.PostCreateMapCompleted, PostCreateMapCompletedPayloadType>;
export const postCreateMapCompleted = (response: GetMapResponse): PostCreateMapCompletedActionType => ({type: MappingActionTypes.PostCreateMapCompleted, payload: { response } });

export type PostCreateMapFailedPayloadType = { error: Error; };
export type PostCreateMapFailedActionType = Action<MappingActionTypes.PostCreateMapFailed, PostCreateMapFailedPayloadType>;
export const postCreateMapFailed = (error: Error): PostCreateMapFailedActionType => ({type: MappingActionTypes.PostCreateMapFailed, payload: { error } });

export type UpdateMappingFormPayloadType = { mappingForm: MappingForm; };
export type UpdateMappingFormActionType = Action<MappingActionTypes.UpdateMappingForm, UpdateMappingFormPayloadType>;
export const updateMappingForm = (mappingForm: MappingForm): UpdateMappingFormActionType => ({type: MappingActionTypes.UpdateMappingForm, payload: { mappingForm } });
