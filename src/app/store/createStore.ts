import { createStore as createReduxStore, applyMiddleware, combineReducers, Action } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ApiService } from '../common/api';
import { LoginReducer } from './reducers/loginReducer';
import { ProfileReducer } from './reducers/profileReducer';
import { OptimizerReducer } from './reducers/optimizerReducer';
import { AppraisalReducer } from './reducers/appraisalReducer';
import { InfoReducer } from './reducers/infoReducer';
import { PropertyReducer } from './reducers/propertyReducer';
import { SaleHistoryReducer } from './reducers/saleHistoryReducer';
import { MappingReducer } from './reducers/mappingReducer';
import { registerUserEpic, clearUserEpic, loginEpic, resetPasswordEpic } from './epics/loginEpic';
import { getUserProfileEpic, getUserProfileByUsernameEpic, getUserRunCountEpic } from './epics/profileEpic';
import { getLastOptimizerRunEpic, postOptimizerRunEpic } from './epics/optimizerEpic';
import { getLastAppraisalEpic, postRunAppraisalEpic } from './epics/appraisalEpic';
import { getCollectionsEpic, getNeighborhoodsEpic, getStreetsEpic, getStatsEpic, getBlockchainStatusEpic, getAnnouncementsEpic } from './epics/infoEpic';
import { postPropertiesForSaleEpic, postPropertiesUnmintedEpic } from './epics/propertyEpic';
import { postSaleHistoryEpic } from './epics/saleHistoryEpic';
import { getMapEpic, postCreateMapEpic } from './epics/mappingEpic';
import { getNFTHistoryEpic, postSearchNFTEpic } from './epics/nftEpic';
import NFTReducer from './reducers/nftReducer';

export const createStore = (config: AppConfig, apiService: ApiService) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, AppState, AppDependencies>({
    dependencies: {
      apiService,
      ...config
    }
  })

  const rootReducer = combineReducers<AppState>({
    LoginState: LoginReducer,
    ProfileState: ProfileReducer,
    OptimizerState: OptimizerReducer,
    AppraisalState: AppraisalReducer,
    InfoState: InfoReducer,
    PropertyState: PropertyReducer,
    SaleHistoryState: SaleHistoryReducer,
    MappingState: MappingReducer,
    NFTState: NFTReducer
  })

  const rootEpic =  combineEpics<Action, Action, AppState, AppDependencies>(
    registerUserEpic,
    clearUserEpic,
    loginEpic,
    resetPasswordEpic,
    getUserProfileEpic,
    getUserProfileByUsernameEpic,
    getLastOptimizerRunEpic,
    postOptimizerRunEpic,
    getUserRunCountEpic,
    getLastAppraisalEpic,
    postRunAppraisalEpic,
    getCollectionsEpic,
    getNeighborhoodsEpic,
    getStreetsEpic,
    getStatsEpic,
    getBlockchainStatusEpic,
    postPropertiesForSaleEpic,
    postPropertiesUnmintedEpic,
    postSaleHistoryEpic,
    getMapEpic,
    postCreateMapEpic,
    getAnnouncementsEpic,
    getNFTHistoryEpic,
    postSearchNFTEpic,
  )

  const middlewares = [epicMiddleware];

  const store = createReduxStore(
    rootReducer,
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run(rootEpic);

  return store;
}

