import WebNFT from '../../common/types/WebNFT';
import WebNFTFilters from '../../common/types/WebNFTFilters';
import WebNFTHistory from '../../common/types/WebNFTHistory';

export interface NFTState {
  isLoadingNFTs: boolean;
  hasError: boolean;
  errorMessage: string;
  
  nfts: WebNFT[];

  isLoadingHistory: boolean,
  nftHistory: WebNFTHistory[],
  hasLoadingHistoryError: boolean,
  loadingHistoryError: string,
  historyDGoodId: number,

  nftUrl: string,
  nftImageName: string,

  formValues: WebNFTFilters;
}