import PostRegisterRequest from './types/messages/PostRegisterRequest';
import PostClearUserRequest from './types/messages/PostClearUserRequest';
import { Observable } from 'rxjs';
import { AjaxClient } from './ajax-client';
import { AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import PostLoginRequest from './types/messages/PostLoginRequest';
import PostResetPasswordRequest from './types/messages/PostResetPasswordRequest';
import GetUserProfileRequest from './types/messages/GetUserProfileRequest';
import GetLastOptimizerRunRequest from './types/messages/GetLastOptimizerRunRequest';
import PostOpitmizerRunRequest from './types/messages/PostOptimizerRunRequest';
import GetRegisteredUserRunCountRequest from './types/messages/GetRegisteredUserRunCountRequest';
import BattleAsset from './types/BattleAsset';
import GetLastAppraisalRequest from './types/messages/GetLastAppraisalRequest';
import PostRunAppraisalRequest from './types/messages/PostRunAppraisalRequest';
import PostPropertiesForSaleRequest from './types/messages/PostPropertiesForSaleRequest';
import PostPropertiesUnmintedRequest from './types/messages/PostPropertiesUnmintedRequest';
import PostSaleHistoryRequest from './types/messages/PostSaleHistoryRequest';
import GetMapRequest from './types/messages/GetMapRequest';
import PostCreateMapRequest from './types/messages/PostCreateMapRequest';
import PostSearchNFTRequest from './types/messages/PostSearchNFTRequest';

export class ApiService {
  ajaxClient: AjaxClient
  baseUrl: string;
  headers: Record<string, string>

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.ajaxClient = new AjaxClient();
    this.headers = {
      "Authorization": "",
      "X-Clacks-Overhead": "GNU Terry Pratchett",
      "Content-Type": "application/json"
    }
  }

  private checkForToken = () => {
    if (this.headers.Authorization === "") {
      let authToken = window.localStorage.getItem("GJSHackathonAuthToken");
      if (authToken && authToken !== "") {
        this.headers.Authorization = authToken;
      }
    }
  }

  healthCheck = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/HealthCheck`,
        headers: this.headers
      })

    const healthCheck$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return healthCheck$.toPromise();
  }

  postRegisterUser$ = (request: PostRegisterRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/User/Register`,
        headers: this.headers,
        body: request
      })

    const register$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return register$;
  }

  postLogin$ = (request: PostLoginRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/UserConnection/BetaLogin`,
        headers: this.headers,
        body: request
      })

    const login$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return login$;
  }

  postResetPassword$ = (request: PostResetPasswordRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/User/ResetPassword`,
        headers: this.headers,
        body: request
      })

    const resetPassword$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return resetPassword$;
  }


  postClearUser$ = (request: PostClearUserRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/User/Clear`,
        headers: this.headers,
        body: request
      })

    const clear$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return clear$;
  }

  getUserProfile$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Battle/Profile`,
        headers: this.headers
      })

    const profile$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return profile$;
  }

  getUserProfileByUsername$ = (request: GetUserProfileRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Profile/${request.uplandUsername}`,
        headers: this.headers
      })

    const profile$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return profile$;
  }

  getUserRunCount$ = (request: GetRegisteredUserRunCountRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Profile/RunCount/${request.uplandUsername}`,
        headers: this.headers
      })

    const runCount$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return runCount$;
  }

  getLastOptimizerRun$ = (request: GetLastOptimizerRunRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Optimizer/${request.registeredUserId}/${request.sortBy}/${request.fileType}`,
        headers: this.headers
      })

    const lastRun$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return lastRun$;
  }

  postOptimizerRun$ = (request: PostOpitmizerRunRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Optimizer`,
        headers: this.headers,
        body: request
      })

    const run$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return run$;
  }

  getLastAppraisal$ = (request: GetLastAppraisalRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Appraisal/${request.registeredUserId}/${request.fileType}`,
        headers: this.headers
      })

    const appraisal$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return appraisal$;
  }

  postRunAppraisal$ = (request: PostRunAppraisalRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Appraisal`,
        headers: this.headers,
        body: request
      })

    const run$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return run$;
  }

  getCollections$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Collections`,
        headers: this.headers
      })

    const collections$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return collections$;
  }

  getNeighborhoods$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Neighborhoods`,
        headers: this.headers
      })

    const neighborhoods$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return neighborhoods$;
  }

  getStreets$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Streets`,
        headers: this.headers
      })

    const streets$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return streets$;
  }

  getStatsByType$ = (type: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Stats/${type}`,
        headers: this.headers
      })

    const stats$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return stats$;
  }


  getBlockchainStatus$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Blockchain`,
        headers: this.headers
      })

    const blockchainStatus$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return blockchainStatus$;
  }

  getAnnouncements$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Info/Announcements`,
        headers: this.headers
      })

    const announcementStatus$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return announcementStatus$;
  }

  getMap$ = (request: GetMapRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Mapping/${request.cityId}/${request.mapType}/${request.registeredUserId}`,
        headers: this.headers
      })

    const getMap$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return getMap$;
  }

  postCreateMap$ = (request: PostCreateMapRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Mapping`,
        headers: this.headers,
        body: request
      })

    const getMap$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return getMap$;
  }

  postPropertiesForSale$ = (request: PostPropertiesForSaleRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Properties/ForSale`,
        headers: this.headers,
        body: request
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postTrainBattleAssetRequest$ = (asset: BattleAsset, trainSkill: string, timeInHours: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Battle/BattleAssets/Train`,
        headers: this.headers,
        body: {
          battleAsset: asset,
          trainSkill: trainSkill,
          timeInHours: timeInHours
        }
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postDebugUpdateBattles$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Battle/Debug/UpdateBattles`,
        headers: this.headers,
        body: {}
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postCreateBattleRequest$ = (asset: BattleAsset, upxWager: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Battle/Create`,
        headers: this.headers,
        body: {
          battleAsset: asset,
          upxWager: upxWager
        }
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  getBattleHistory$ = (battleAssedId: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Battle/History/${battleAssedId}`,
        headers: this.headers,
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postResolveApprovedTrainings$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Battle/Debug/CompleteTrainings`,
        headers: this.headers,
        body: {}
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postPropertiesUnminted$ = () => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Battle/Active`,
        headers: this.headers,
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postJoinBattle$ = (battleAsset: BattleAsset, battleId: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Battle/Join`,
        headers: this.headers,
        body: {
          battleAsset: battleAsset,
          battleId: battleId
        }
      })

    const properties$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return properties$;
  }

  postSaleHistory$ = (request: PostSaleHistoryRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/Properties/SaleHistory`,
        headers: this.headers,
        body: request
      })

    const saleHistory$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return saleHistory$;
  }

  postSearchNFTs$ = (request: PostSearchNFTRequest) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .post({
        url: `${this.baseUrl}/NFT/Search`,
        headers: this.headers,
        body: request
      })

    const nftResponse$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return nftResponse$;
  }

  getNFTHistory$ = (request: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/NFT/History/${request}`,
        headers: this.headers
      })

    const nftHistory$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return nftHistory$;
  }

  getPropertyHistory$ = (request: number) => {
    this.checkForToken();

    const response$: Observable<AjaxResponse> = this
      .ajaxClient
      .get({
        url: `${this.baseUrl}/Properties/PropertyHistory/${request}`,
        headers: this.headers
      })

    const propertyHistory$ = response$.pipe(
      map(response => {
        return response;
      })
    );

    return propertyHistory$;
  }
}