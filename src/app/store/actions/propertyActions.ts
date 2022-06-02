import Action from './baseAction';
import PostPropertiesForSaleRequest from '../../common/types/messages/PostPropertiesForSaleRequest';
import PostPropertiesForSaleResponse from '../../common/types/messages/PostPropertiesForSaleResponse';
import PostPropertiesUnmintedRequest from '../../common/types/messages/PostPropertiesUnmintedRequest';
import PostPropertiesUnmintedResponse from '../../common/types/messages/PostPropertiesUnmintedResponse';
import GetPropertyHistoryResponse from '../../common/types/messages/GetPropertyHistoryResponse';
import Battle from '../../common/types/Battle';
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
  ClosePropertyHistory = 'CLOSE_PROPERTY_HISTORY',
  CreateBattle = 'CREATE_BATTLE',
  CloseCreateBattle = 'CLOSE_CREATE_BATTLE',
  GetBattleHistory = 'GET_BATTLE_HISTORY',
  GetBattleHistoryCompleted = 'GET_BATTLE_HISTORY_COMPLETED',
  GetBattleHistoryFailed = 'GET_BATTLE_HISTORY_FAILED',
  CloseBattleHistory = 'CLOSE_BATTLE_HISTORY',
  JoinBattle = 'JOIN_BATTLE',
  CloseJoinBattle = 'CLOSE_JOIN_BATTLE'
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

export type PostPropertiesUnmintedPayloadType = {  };
export type PostPropertiesUnmintedActionType = Action<PropertyActionTypes.PostPropertiesUnminted, PostPropertiesUnmintedPayloadType>;
export const postPropertiesUnminted= ( ): PostPropertiesUnmintedActionType => ({type: PropertyActionTypes.PostPropertiesUnminted, payload: { } });

export type PostPropertiesUnmintedCompletedPayloadType = {  response: Battle[]; };
export type PostPropertiesUnmintedCompletedActionType = Action<PropertyActionTypes.PostPropertiesUnmintedCompleted, PostPropertiesUnmintedCompletedPayloadType>;
export const postPropertiesUnmintedCompleted = (response: Battle[]): PostPropertiesUnmintedCompletedActionType => ({type: PropertyActionTypes.PostPropertiesUnmintedCompleted, payload: { response } });

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

export type CreateBattlePayloadType = { battleAsset: BattleAsset };
export type CreateBattleActionType = Action<PropertyActionTypes.CreateBattle, CreateBattlePayloadType>;
export const createBattle = (battleAsset: BattleAsset): CreateBattleActionType => ({type: PropertyActionTypes.CreateBattle, payload: { battleAsset } });

export type CloseCreateBattlePayloadType = { };
export type CloseCreateBattleActionType = Action<PropertyActionTypes.CloseCreateBattle, CloseCreateBattlePayloadType>;
export const closeCreateBattle = (): CloseCreateBattleActionType => ({type: PropertyActionTypes.CloseCreateBattle, payload: { } });

export type GetBattleHistoryPayloadType = { battleAssetId: number };
export type GetBattleHistoryActionType = Action<PropertyActionTypes.GetBattleHistory, GetBattleHistoryPayloadType>;
export const getBattleHistory = (battleAssetId: number): GetBattleHistoryActionType => ({type: PropertyActionTypes.GetBattleHistory, payload: { battleAssetId } });

export type GetBattleHistoryCompletedPayloadType = { battleHistory: Battle[] };
export type GetBattleHistoryCompletedActionType = Action<PropertyActionTypes.GetBattleHistoryCompleted, GetBattleHistoryCompletedPayloadType>;
export const getBattleHistoryCompleted = (battleHistory: Battle[]): GetBattleHistoryCompletedActionType => ({type: PropertyActionTypes.GetBattleHistoryCompleted, payload: { battleHistory } });

export type GetBattleHistoryFailedPayloadType = { };
export type GetBattleHistoryFailedActionType = Action<PropertyActionTypes.GetBattleHistoryFailed, GetBattleHistoryFailedPayloadType>;
export const getBattleHistoryFailed = (): GetBattleHistoryFailedActionType => ({type: PropertyActionTypes.GetBattleHistoryFailed, payload: { } });

export type CloseBattleHistoryPayloadType = { };
export type CloseBattleHistoryActionType = Action<PropertyActionTypes.CloseBattleHistory, CloseBattleHistoryPayloadType>;
export const closeBattleHistory = (): CloseBattleHistoryActionType => ({type: PropertyActionTypes.CloseBattleHistory, payload: { } });

export type JoinBattlePayloadType = { battleId: number };
export type JoinBattleActionType = Action<PropertyActionTypes.JoinBattle, JoinBattlePayloadType>;
export const joinBattle = (battleId: number): JoinBattleActionType => ({type: PropertyActionTypes.JoinBattle, payload: { battleId } });

export type CloseJoinBattlePayloadType = { };
export type CloseJoinBattleActionType = Action<PropertyActionTypes.CloseJoinBattle, CloseJoinBattlePayloadType>;
export const closeJoinBattle = (): CloseJoinBattleActionType => ({type: PropertyActionTypes.CloseJoinBattle, payload: { } });

