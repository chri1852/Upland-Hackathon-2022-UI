import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import GetNFTHistoryResponse from '../../common/types/messages/GetNFTHistoryResponse';
import PostSearchNFTResponse from '../../common/types/messages/PostSearchNFTResponse';
import {
  NFTActionTypes,
  GetNFTHistoryActionType,
  GetNFTHistoryCompletedActionType,
  GetNFTHistoryFailedActionType,
  PostSearchNFTActionType,
  PostSearchNFTCompletedActionType,
  PostSearchNFTFailedActionType,
  getNFTHistoryCompleted,
  getNFTHistoryFailed,
  postSearchNFTCompleted,
  postSearchNFTFailed
} from '../actions/nftActions';

export const getNFTHistoryEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(NFTActionTypes.GetNFTHistory),
    mergeMap((action) => onGetNFTHistory(action, dependencies))
  );
}

export const onGetNFTHistory: (action: GetNFTHistoryActionType, dependencies: AppDependencies) 
  => Observable<GetNFTHistoryCompletedActionType | GetNFTHistoryFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.getNFTHistory$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return getNFTHistoryCompleted(response.response as GetNFTHistoryResponse);
    }),
    catchError(error => {
      return of(getNFTHistoryFailed(error.response.message));
    })
  );
}

export const postSearchNFTEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(NFTActionTypes.PostSearchNFT),
    mergeMap((action) => onPostSearchNFT(action, dependencies))
  );
}

export const onPostSearchNFT: (action: PostSearchNFTActionType, dependencies: AppDependencies) 
  => Observable<PostSearchNFTCompletedActionType | PostSearchNFTFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postSearchNFTs$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postSearchNFTCompleted(response.response as PostSearchNFTResponse);
    }),
    catchError(error => {
      return of(postSearchNFTFailed(error.response.message));
    })
  );
}