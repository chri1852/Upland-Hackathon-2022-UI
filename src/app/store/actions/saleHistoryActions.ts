import Action from './baseAction';
import PostSaleHistoryRequest from '../../common/types/messages/PostSaleHistoryRequest';
import PostSaleHistoryResponse from '../../common/types/messages/PostSaleHistoryResponse';
import WebSaleHistoryFilters from '../../common/types/WebSaleHistoryFilters';
import WebCollection from '../../common/types/WebCollection';
import WebNeighborhood from '../../common/types/WebNeighborhood';

export enum SaleHistoryActionTypes {
  PostSaleHistory = 'POST_SALE_HISTORY',
  PostSaleHistoryCompleted = 'POST_SALE_HISTORY_COMPLETED',
  PostSaleHistoryFailed = 'POST_SALE_HISTORY_FAILED',
  UpdateSaleHistoryForm = 'UPDATE_SALE_HISTORY_FORM',
}

export type PostSaleHistoryPayloadType = { request: PostSaleHistoryRequest };
export type PostSaleHistoryActionType = Action<SaleHistoryActionTypes.PostSaleHistory, PostSaleHistoryPayloadType>;
export const postSaleHistory = (request: PostSaleHistoryRequest): PostSaleHistoryActionType => ({type: SaleHistoryActionTypes.PostSaleHistory, payload: { request } });

export type PostSaleHistoryCompletedPayloadType = { response: PostSaleHistoryResponse; };
export type PostSaleHistoryCompletedActionType = Action<SaleHistoryActionTypes.PostSaleHistoryCompleted, PostSaleHistoryCompletedPayloadType>;
export const postSaleHistoryCompleted = (response: PostSaleHistoryResponse): PostSaleHistoryCompletedActionType => ({type: SaleHistoryActionTypes.PostSaleHistoryCompleted, payload: { response } });

export type PostSaleHistoryFailedPayloadType = { error: Error; };
export type PostSaleHistoryFailedActionType = Action<SaleHistoryActionTypes.PostSaleHistoryFailed, PostSaleHistoryFailedPayloadType>;
export const postSaleHistoryFailed = (error: Error): PostSaleHistoryFailedActionType => ({type: SaleHistoryActionTypes.PostSaleHistoryFailed, payload: { error } });

export type UpdateSaleHistoryFormPayloadType = { filters: WebSaleHistoryFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], selectedSearchType: number };
export type UpdateSaleHistoryFormActionType = Action<SaleHistoryActionTypes.UpdateSaleHistoryForm, UpdateSaleHistoryFormPayloadType>;
export const updateSaleHistoryForm = (filters: WebSaleHistoryFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], selectedSearchType: number): UpdateSaleHistoryFormActionType => ({type: SaleHistoryActionTypes.UpdateSaleHistoryForm, payload: { filters, collections, neighborhoods, selectedSearchType } });