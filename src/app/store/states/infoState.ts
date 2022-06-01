import { CollatedStatsObject } from "../../common/types/CollatedStatsObject";
import WebCollection from "../../common/types/WebCollection";
import WebNeighborhood from "../../common/types/WebNeighborhood";
import WebStreet from "../../common/types/WebStreet";
import StatsFormState from '../../common/types/StatsFormState';

export interface InfoState {
  collections: WebCollection[];
  neighborhoods: WebNeighborhood[];
  streets: WebStreet[];

  cityStats: CollatedStatsObject[];
  neighborhoodStats: CollatedStatsObject[];
  streetStats: CollatedStatsObject[];
  collectionStats: CollatedStatsObject[];

  isLoadingCollections: boolean;
  isLoadingNeighborhoods: boolean;
  isLoadingStreets: boolean;

  isLoadingStats: boolean;

  hasError: boolean;
  errorMessage: string;

  hasStatsError: boolean;
  statsErrorMessage: string;

  isBlockchainDisabled: boolean;

  hasAnnouncement: boolean;
  announcement: string;

  statsFormState: StatsFormState;
}