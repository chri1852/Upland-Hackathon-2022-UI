/// <reference types="react-scripts" />

type LoginState = import('./app/store/states/loginState').LoginState;
type ProfileState = import('./app/store/states/profileState').ProfileState;
type LookedupUserState = import('./app/store/states/lookedupUserState').LookedupUserState;
type OptimizerState = import('./app/store/states/optimizerState').OptimizerState;
type AppraisalState = import('./app/store/states/appraisalState').AppraisalState;
type InfoState = import('./app/store/states/infoState').InfoState;
type PropertyState = import('./app/store/states/propertyState').PropertyState;
type SaleHistoryState = import('./app/store/states/salehistoryState').SaleHistoryState;
type MappingState = import('./app/store/states/mappingState').MappingState;
type NFTState = import('./app/store/states/nftState').NFTState;

declare interface AppConfig {
  uplandOptimizerWebUrl: string;
}

declare interface AppState {
  LoginState: LoginState;
  ProfileState: ProfileState;
  OptimizerState: OptimizerState;
  AppraisalState: AppraisalState;
  InfoState: InfoState;
  PropertyState: PropertyState;
  SaleHistoryState: SaleHistoryState;
  MappingState: MappingState;
  NFTState: NFTState;
}

declare type AppEpic = import('redux-observable').Epic<
  import('redux').Action,
  import('redux').Action,
  AppState,
  AppDependencies
>

declare interface AppDependencies extends AppConfig {
  apiService: import('./app/common/api').ApiService;
}