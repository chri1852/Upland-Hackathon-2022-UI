import Action from './baseAction';
import GetCollectionsResponse from '../../common/types/messages/GetCollectionsResponse';
import GetNeighborhoodsResponse from '../../common/types/messages/GetNeighborhoodsResponse';
import GetStreetsResponse from '../../common/types/messages/GetStreetsResponse';
import GetStatsResponse from '../../common/types/messages/GetStatsResponse';
import GetBlockchainStatusResponse from '../../common/types/messages/GetBlockchainStatusResponse';
import GetAnnouncementsResponse from '../../common/types/messages/GetAnnouncementsResponse';
import StatsFormState from '../../common/types/StatsFormState';

export enum InfoActionTypes {
  GetCollections = 'GET_COLLECTIONS',
  GetCollectionsCompleted = 'GET_COLLECTIONSL_COMPLETED',
  GetCollectionsFailed = 'GET_COLLECTIONS_FAILED',
  GetNeighborhoods = 'GET_NEIGHBORHOODS',
  GetNeighborhoodsCompleted = 'GET_NEIGHBORHOODS_COMPLETED',
  GetNeighborhoodsFailed = 'GET_NEIGHBORHOODS_FAILED',
  GetStreets = 'GET_STREETS',
  GetStreetsCompleted = 'GET_STREETS_COMPLETED',
  GetStreetsFailed = 'GET_STREETS_FAILED',
  GetStats = 'GET_STATS',
  GetStatsCompleted = 'GET_STATS_COMPLETED',
  GetStatsFailed = 'GET_STATS_FAILED',
  GetBlockchainStatus = 'GET_BLOCKCHAIN_STATUS',
  GetBlockchainStatusCompleted = 'GET_BLOCKCHAIN_STATUS_COMPLETED',
  GetBlockchainStatusFailed = 'GET_BLOCKCHAIN_STATUS_FAILED',
  GetAnnouncements = 'GET_ANNOUNCEMENTS',
  GetAnnouncementsCompleted = 'GET_ANNOUNCEMENTS_COMPLETED',
  GetAnnouncementsFailed = 'GET_ANNOUNCEMENTS_FAILED',
  UpdateStatsForm = 'UPDATE_STATS_FORM'
}

export type GetCollectionsPayloadType = {};
export type GetCollectionsActionType = Action<InfoActionTypes.GetCollections, GetCollectionsPayloadType>;
export const getCollections = (): GetCollectionsActionType => ({type: InfoActionTypes.GetCollections, payload: {} });

export type GetCollectionsCompletedPayloadType = { response: GetCollectionsResponse; };
export type GetCollectionsCompletedActionType = Action<InfoActionTypes.GetCollectionsCompleted, GetCollectionsCompletedPayloadType>;
export const getCollectionsCompleted = (response: GetCollectionsResponse): GetCollectionsCompletedActionType => ({type: InfoActionTypes.GetCollectionsCompleted, payload: { response } });

export type GetCollectionsFailedPayloadType = { error: Error; };
export type GetCollectionsFailedActionType = Action<InfoActionTypes.GetCollectionsFailed, GetCollectionsFailedPayloadType>;
export const getCollectionsFailed = (error: Error): GetCollectionsFailedActionType => ({type: InfoActionTypes.GetCollectionsFailed, payload: { error } });

export type GetNeighborhoodsPayloadType = {};
export type GetNeighborhoodsActionType = Action<InfoActionTypes.GetNeighborhoods, GetNeighborhoodsPayloadType>;
export const getNeighborhoods = (): GetNeighborhoodsActionType => ({type: InfoActionTypes.GetNeighborhoods, payload: {} });

export type GetNeighborhoodsCompletedPayloadType = { response: GetNeighborhoodsResponse; };
export type GetNeighborhoodsCompletedActionType = Action<InfoActionTypes.GetNeighborhoodsCompleted, GetNeighborhoodsCompletedPayloadType>;
export const getNeighborhoodsCompleted = (response: GetNeighborhoodsResponse): GetNeighborhoodsCompletedActionType => ({type: InfoActionTypes.GetNeighborhoodsCompleted, payload: { response } });

export type GetNeighborhoodsFailedPayloadType = { error: Error; };
export type GetNeighborhoodsFailedActionType = Action<InfoActionTypes.GetNeighborhoodsFailed, GetNeighborhoodsFailedPayloadType>;
export const getNeighborhoodsFailed = (error: Error): GetNeighborhoodsFailedActionType => ({type: InfoActionTypes.GetNeighborhoodsFailed, payload: { error } });

export type GetStreetsPayloadType = {};
export type GetStreetsActionType = Action<InfoActionTypes.GetStreets, GetStreetsPayloadType>;
export const getStreets = (): GetStreetsActionType => ({type: InfoActionTypes.GetStreets, payload: {} });

export type GetStreetsCompletedPayloadType = { response: GetStreetsResponse; };
export type GetStreetsCompletedActionType = Action<InfoActionTypes.GetStreetsCompleted, GetStreetsCompletedPayloadType>;
export const getStreetsCompleted = (response: GetStreetsResponse): GetStreetsCompletedActionType => ({type: InfoActionTypes.GetStreetsCompleted, payload: { response } });

export type GetStreetsFailedPayloadType = { error: Error; };
export type GetStreetsFailedActionType = Action<InfoActionTypes.GetStreetsFailed, GetStreetsFailedPayloadType>;
export const getStreetsFailed = (error: Error): GetStreetsFailedActionType => ({type: InfoActionTypes.GetStreetsFailed, payload: { error } });

export type GetStatsPayloadType = { type: number };
export type GetStatsActionType = Action<InfoActionTypes.GetStats, GetStatsPayloadType>;
export const getStats = (type: number): GetStatsActionType => ({type: InfoActionTypes.GetStats, payload: { type: type } });

export type GetStatsCompletedPayloadType = { response: GetStatsResponse; };
export type GetStatsCompletedActionType = Action<InfoActionTypes.GetStatsCompleted, GetStatsCompletedPayloadType>;
export const getStatsCompleted = (response: GetStatsResponse): GetStatsCompletedActionType => ({type: InfoActionTypes.GetStatsCompleted, payload: { response } });

export type GetStatsFailedPayloadType = { error: Error; };
export type GetStatsFailedActionType = Action<InfoActionTypes.GetStatsFailed, GetStatsFailedPayloadType>;
export const getStatsFailed = (error: Error): GetStatsFailedActionType => ({type: InfoActionTypes.GetStatsFailed, payload: { error } });

export type GetBlockchainStatusPayloadType = {};
export type GetBlockchainStatusActionType = Action<InfoActionTypes.GetBlockchainStatus, GetBlockchainStatusPayloadType>;
export const getBlockchainStatus = (): GetBlockchainStatusActionType => ({type: InfoActionTypes.GetBlockchainStatus, payload: {} });

export type GetBlockchainStatusCompletedPayloadType = { response: GetBlockchainStatusResponse; };
export type GetBlockchainStatusCompletedActionType = Action<InfoActionTypes.GetBlockchainStatusCompleted, GetBlockchainStatusCompletedPayloadType>;
export const getBlockchainStatusCompleted = (response: GetBlockchainStatusResponse): GetBlockchainStatusCompletedActionType => ({type: InfoActionTypes.GetBlockchainStatusCompleted, payload: { response } });

export type GetBlockchainStatusFailedPayloadType = { error: Error; };
export type GetBlockchainStatusFailedActionType = Action<InfoActionTypes.GetBlockchainStatusFailed, GetBlockchainStatusFailedPayloadType>;
export const getBlockchainStatusFailed = (error: Error): GetBlockchainStatusFailedActionType => ({type: InfoActionTypes.GetBlockchainStatusFailed, payload: { error } });

export type GetAnnouncementsPayloadType = {};
export type GetAnnouncementsActionType = Action<InfoActionTypes.GetAnnouncements, GetAnnouncementsPayloadType>;
export const getAnnouncements = (): GetAnnouncementsActionType => ({type: InfoActionTypes.GetAnnouncements, payload: {} });

export type GetAnnouncementsCompletedPayloadType = { response: GetAnnouncementsResponse; };
export type GetAnnouncementsCompletedActionType = Action<InfoActionTypes.GetAnnouncementsCompleted, GetAnnouncementsCompletedPayloadType>;
export const getAnnouncementsCompleted = (response: GetAnnouncementsResponse): GetAnnouncementsCompletedActionType => ({type: InfoActionTypes.GetAnnouncementsCompleted, payload: { response } });

export type GetAnnouncementsFailedPayloadType = { error: Error; };
export type GetAnnouncementsFailedActionType = Action<InfoActionTypes.GetAnnouncementsFailed, GetAnnouncementsFailedPayloadType>;
export const getAnnouncementsFailed = (error: Error): GetAnnouncementsFailedActionType => ({type: InfoActionTypes.GetAnnouncementsFailed, payload: { error } });

export type UpdateStatsFormPayloadType = { form: StatsFormState };
export type UpdateStatsFormActionType = Action<InfoActionTypes.UpdateStatsForm, UpdateStatsFormPayloadType>;
export const updateStatsForm = (form: StatsFormState): UpdateStatsFormActionType => ({type: InfoActionTypes.UpdateStatsForm, payload: { form } });
