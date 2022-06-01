import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import PostSaleHistoryResponse from '../../common/types/messages/PostSaleHistoryResponse';
import {
  SaleHistoryActionTypes,
  PostSaleHistoryActionType,
  PostSaleHistoryCompletedActionType,
  PostSaleHistoryFailedActionType,
  postSaleHistoryCompleted,
  postSaleHistoryFailed,

} from '../actions/saleHistoryActions';

export const postSaleHistoryEpic: AppEpic = (action$, state$, dependencies) => {
  return action$.pipe(
    ofType(SaleHistoryActionTypes.PostSaleHistory),
    mergeMap((action) => onPostSaleHistory(action, dependencies))
  );
}

export const onPostSaleHistory: (action: PostSaleHistoryActionType, dependencies: AppDependencies) 
  => Observable<PostSaleHistoryCompletedActionType | PostSaleHistoryFailedActionType> = (action, { apiService }) => {
    
  const callResponse$ = apiService.postSaleHistory$(action.payload!.request);

  return callResponse$.pipe(
    map(response => {
      return postSaleHistoryCompleted(response.response as PostSaleHistoryResponse);
    }),
    catchError(error => {
      return of(postSaleHistoryFailed(error.response.message));
    })
  );
}

