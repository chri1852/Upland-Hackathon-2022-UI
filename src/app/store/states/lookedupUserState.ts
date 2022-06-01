import UserProfile from '../../common/types/UserProfile';
import ProfilePropertyFilters from '../../common/types/ProfilePropertyFilters';
import ProfileNFTFilters from '../../common/types/ProfileNFTFilters';
import ProfileSparkHistoryFilters from '../../common/types/ProfileSparkHistoryFilters';

export default interface lookedupUserState {
  userProfile: UserProfile;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  filters: ProfilePropertyFilters;
  nftFilters: ProfileNFTFilters;
  sparkHistoryFilters: ProfileSparkHistoryFilters;
  view: string;
  viewCategory: string;
}