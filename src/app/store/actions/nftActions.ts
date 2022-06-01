import Action from './baseAction';
import WebNFTFilters from '../../common/types/WebNFTFilters';
import GetNFTHistoryResponse from '../../common/types/messages/GetNFTHistoryResponse';
import PostSearchNFTRequest from '../../common/types/messages/PostSearchNFTRequest';
import PostSearchNFTResponse from '../../common/types/messages/PostSearchNFTResponse';

export enum NFTActionTypes {
  GetNFTHistory = 'GET_NFT_HISTORY',
  GetNFTHistoryCompleted = 'GET_NFT_HISTORY_COMPLETED',
  GetNFTHistoryFailed = 'GET_NFT_HISTORY_FAILED',
  PostSearchNFT = 'POST_SEARCH_NFT_RUN',
  PostSearchNFTCompleted = 'POST_SEARCH_NFT_RUN_COMPLETED',
  PostSearchNFTFailed = 'POST_SEARCH_NFT_RUN_FAILED',
  UpdateNFTForm = 'UPDATE_NFT_FORM',
  UpdateNFTFormCategory = 'UPDATE_NFT_FORM_CATEGORY',
  CloseNFTHistory = 'CLOSE_NFT_HISTORY',
  ToggleImageModal = 'TOGGLE_IMAGE_MODAL',
}

export type GetNFTHistoryPayloadType = { request: number };
export type GetNFTHistoryActionType = Action<NFTActionTypes.GetNFTHistory, GetNFTHistoryPayloadType>;
export const getNFTHistory = (request: number): GetNFTHistoryActionType => ({type: NFTActionTypes.GetNFTHistory, payload: { request } });

export type GetNFTHistoryCompletedPayloadType = { response: GetNFTHistoryResponse; };
export type GetNFTHistoryCompletedActionType = Action<NFTActionTypes.GetNFTHistoryCompleted, GetNFTHistoryCompletedPayloadType>;
export const getNFTHistoryCompleted = (response: GetNFTHistoryResponse): GetNFTHistoryCompletedActionType => ({type: NFTActionTypes.GetNFTHistoryCompleted, payload: { response } });

export type GetNFTHistoryFailedPayloadType = { error: Error; };
export type GetNFTHistoryFailedActionType = Action<NFTActionTypes.GetNFTHistoryFailed, GetNFTHistoryFailedPayloadType>;
export const getNFTHistoryFailed = (error: Error): GetNFTHistoryFailedActionType => ({type: NFTActionTypes.GetNFTHistoryFailed, payload: { error } });

export type PostSearchNFTPayloadType = { request: PostSearchNFTRequest };
export type PostSearchNFTActionType = Action<NFTActionTypes.PostSearchNFT, PostSearchNFTPayloadType>;
export const postSearchNFT = (request: PostSearchNFTRequest): PostSearchNFTActionType => ({type: NFTActionTypes.PostSearchNFT, payload: { request } });

export type PostSearchNFTCompletedPayloadType = { response: PostSearchNFTResponse; };
export type PostSearchNFTCompletedActionType = Action<NFTActionTypes.PostSearchNFTCompleted, PostSearchNFTCompletedPayloadType>;
export const postSearchNFTCompleted = (response: PostSearchNFTResponse): PostSearchNFTCompletedActionType => ({type: NFTActionTypes.PostSearchNFTCompleted, payload: { response } });

export type PostSearchNFTFailedPayloadType = { error: Error; };
export type PostSearchNFTFailedActionType = Action<NFTActionTypes.PostSearchNFTFailed, PostSearchNFTFailedPayloadType>;
export const postSearchNFTFailed = (error: Error): PostSearchNFTFailedActionType => ({type: NFTActionTypes.PostSearchNFTFailed, payload: { error } });

export type UpdateNFTFormPayloadType = { formValues: WebNFTFilters };
export type UpdateNFTFormActionType = Action<NFTActionTypes.UpdateNFTForm, UpdateNFTFormPayloadType>;
export const updateNFTForm = (formValues: WebNFTFilters): UpdateNFTFormActionType => ({type: NFTActionTypes.UpdateNFTForm, payload: { formValues } });

export type UpdateNFTFormCategoryPayloadType = { category: string };
export type UpdateNFTFormCategoryActionType = Action<NFTActionTypes.UpdateNFTFormCategory, UpdateNFTFormCategoryPayloadType>;
export const updateNFTFormCategory = (category: string): UpdateNFTFormCategoryActionType => ({type: NFTActionTypes.UpdateNFTFormCategory, payload: { category } });

export type CloseNFTHistoryPayloadType = { };
export type CloseNFTHistoryActionType = Action<NFTActionTypes.CloseNFTHistory, CloseNFTHistoryPayloadType>;
export const closeNFTHistory = (): CloseNFTHistoryActionType => ({type: NFTActionTypes.CloseNFTHistory, payload: { } });

export type ToggleImageModalPayloadType = { url: string, imageName: string };
export type ToggleImageModalActionType = Action<NFTActionTypes.ToggleImageModal, ToggleImageModalPayloadType>;
export const toggleImageModal = (url: string, imageName: string): ToggleImageModalActionType => ({type: NFTActionTypes.ToggleImageModal, payload: { url, imageName } });

