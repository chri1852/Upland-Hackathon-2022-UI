import Action from './baseAction';
import PostPropertiesForSaleRequest from '../../common/types/messages/PostPropertiesForSaleRequest';
import PostPropertiesForSaleResponse from '../../common/types/messages/PostPropertiesForSaleResponse';
import PostPropertiesUnmintedRequest from '../../common/types/messages/PostPropertiesUnmintedRequest';
import PostPropertiesUnmintedResponse from '../../common/types/messages/PostPropertiesUnmintedResponse';
import GetPropertyHistoryResponse from '../../common/types/messages/GetPropertyHistoryResponse';
import WebForSaleFilters from '../../common/types/WebForSaleFilters';
import WebCollection from '../../common/types/WebCollection';
import WebNeighborhood from '../../common/types/WebNeighborhood';
import { KeyValuePair } from '../../common/types/KeyValuePair';
import BattleAsset from '../../common/types/BattleAsset';

export enum PropertyActionTypes {
  PostPropertiesForSale = 'POST_PROPERTIES_FOR_SALE',
  PostPropertiesForSaleCompleted = 'POST_PROPERTIES_FOR_SALE_COMPLETED',
  PostPropertiesForSaleFailed = 'POST_PROPERTIES_FOR_SALE_FAILED',
  PostPropertiesUnminted = 'POST_PROPERTIES_UNMINTED',
  PostPropertiesUnmintedCompleted = 'POST_PROPERTIES_UNMINTED_COMPLETED',
  PostPropertiesUnmintedFailed = 'POST_PROPERTIES_UNMINTED_FAILED',
  UpdateForSaleForm = 'UPDATE_FOR_SALE_FORM',
  UpdateUnmintedForm = 'UPDATE_UNMINTED_FORM',
  GetPropertyHistory = 'GET_PROPERTY_HISTORY',
  ClosePropertyHistory = 'CLOSE_PROPERTY_HISTORY'
}

export type PostPropertiesForSalePayloadType = { request: PostPropertiesForSaleRequest };
export type PostPropertiesForSaleActionType = Action<PropertyActionTypes.PostPropertiesForSale, PostPropertiesForSalePayloadType>;
export const postPropertiesForSale = (request: PostPropertiesForSaleRequest): PostPropertiesForSaleActionType => ({type: PropertyActionTypes.PostPropertiesForSale, payload: { request } });

export type PostPropertiesForSaleCompletedPayloadType = { response: PostPropertiesForSaleResponse; };
export type PostPropertiesForSaleCompletedActionType = Action<PropertyActionTypes.PostPropertiesForSaleCompleted, PostPropertiesForSaleCompletedPayloadType>;
export const postPropertiesForSaleCompleted = (response: PostPropertiesForSaleResponse): PostPropertiesForSaleCompletedActionType => ({type: PropertyActionTypes.PostPropertiesForSaleCompleted, payload: { response } });

export type PostPropertiesForSaleFailedPayloadType = { error: Error; };
export type PostPropertiesForSaleFailedActionType = Action<PropertyActionTypes.PostPropertiesForSaleFailed, PostPropertiesForSaleFailedPayloadType>;
export const postPropertiesForSaleFailed = (error: Error): PostPropertiesForSaleFailedActionType => ({type: PropertyActionTypes.PostPropertiesForSaleFailed, payload: { error } });

export type PostPropertiesUnmintedPayloadType = { request: PostPropertiesUnmintedRequest };
export type PostPropertiesUnmintedActionType = Action<PropertyActionTypes.PostPropertiesUnminted, PostPropertiesUnmintedPayloadType>;
export const postPropertiesUnminted= (request: PostPropertiesUnmintedRequest): PostPropertiesUnmintedActionType => ({type: PropertyActionTypes.PostPropertiesUnminted, payload: { request } });

export type PostPropertiesUnmintedCompletedPayloadType = { response: PostPropertiesUnmintedResponse; };
export type PostPropertiesUnmintedCompletedActionType = Action<PropertyActionTypes.PostPropertiesUnmintedCompleted, PostPropertiesUnmintedCompletedPayloadType>;
export const postPropertiesUnmintedCompleted = (response: PostPropertiesUnmintedResponse): PostPropertiesUnmintedCompletedActionType => ({type: PropertyActionTypes.PostPropertiesUnmintedCompleted, payload: { response } });

export type PostPropertiesUnmintedFailedPayloadType = { error: Error; };
export type PostPropertiesUnmintedFailedActionType = Action<PropertyActionTypes.PostPropertiesUnmintedFailed, PostPropertiesUnmintedFailedPayloadType>;
export const postPropertiesUnmintedFailed = (error: Error): PostPropertiesUnmintedFailedActionType => ({type: PropertyActionTypes.PostPropertiesUnmintedFailed, payload: { error } });

export type UpdateForSaleFormPayloadType = { filters: WebForSaleFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], buildings: KeyValuePair[] };
export type UpdateForSaleFormActionType = Action<PropertyActionTypes.UpdateForSaleForm, UpdateForSaleFormPayloadType>;
export const updateForSaleForm = (filters: WebForSaleFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], buildings: KeyValuePair[]): UpdateForSaleFormActionType => ({type: PropertyActionTypes.UpdateForSaleForm, payload: { filters, collections, neighborhoods, buildings } });

export type UpdateUnmintedFormPayloadType = { filters: WebForSaleFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], fsas: string };
export type UpdateUnmintedFormActionType = Action<PropertyActionTypes.UpdateUnmintedForm, UpdateUnmintedFormPayloadType>;
export const updateUnmintedForm = (filters: WebForSaleFilters, collections: WebCollection[], neighborhoods: WebNeighborhood[], fsas: string): UpdateUnmintedFormActionType => ({type: PropertyActionTypes.UpdateUnmintedForm, payload: { filters, collections, neighborhoods, fsas } });

export type GetPropertyHistoryPayloadType = { battleAsset: BattleAsset };
export type GetPropertyHistoryActionType = Action<PropertyActionTypes.GetPropertyHistory, GetPropertyHistoryPayloadType>;
export const getPropertyHistory = (battleAsset: BattleAsset): GetPropertyHistoryActionType => ({type: PropertyActionTypes.GetPropertyHistory, payload: { battleAsset } });

export type ClosePropertyHistoryPayloadType = { };
export type ClosePropertyHistoryActionType = Action<PropertyActionTypes.ClosePropertyHistory, ClosePropertyHistoryPayloadType>;
export const closePropertyHistory = (): ClosePropertyHistoryActionType => ({type: PropertyActionTypes.ClosePropertyHistory, payload: { } });
