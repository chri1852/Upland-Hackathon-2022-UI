import CachedForSaleProperty from '../../common/types/CachedForSaleProperty';
import CachedUnmintedProperty from '../../common/types/CachedUnmintedProperty';
import { KeyValuePair } from '../../common/types/KeyValuePair';
import UIPropertyHistory from '../../common/types/UIPropertyHistory';
import WebCollection from '../../common/types/WebCollection';
import WebForSaleFilters from '../../common/types/WebForSaleFilters';
import WebNeighborhood from '../../common/types/WebNeighborhood';
import BattleAsset from '../../common/types/BattleAsset';
import Battle from '../../common/types/Battle';

export interface PropertyState {
  propertiesForSale: CachedForSaleProperty[];
  propertiesUnminted: Battle[];

  isLoadingForSaleProperties: boolean;
  hasErrorForSaleProp: boolean;
  errorForSalePropsMessage: string;

  isLoadingUnmintedProperties: boolean;
  hasErrorUnmintedProp: boolean;
  errorUnmintedPropsMessage: string;

  forSaleFormState: WebForSaleFilters;
  forSaleSelectedCollections: WebCollection[],
  forSaleSelectedNeighborhoods: WebNeighborhood[],
  forSaleSelectedBuildings: KeyValuePair[],

  unmintedFormState: WebForSaleFilters;
  unmintedSelectedCollections: WebCollection[],
  unmintedSelectedNeighborhoods: WebNeighborhood[],
  unmintedSelectedFSA: string,

  isLoadingHistory: boolean,
  showModal: boolean,
  battleAsset: BattleAsset,
  hasLoadingHistoryError: boolean,
  loadingHistoryError: string,

  showBattleModal: boolean,
  battleBattleAsset: BattleAsset,

  showBattleHistoryModal: boolean,
  battleHistory: Battle[],

  showJoinBattleModal: boolean,
  joinBattleId: number
}