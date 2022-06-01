import WebNFTFilters from '../WebNFTFilters';

export default interface PostSearchNFTRequest {
  filters: WebNFTFilters;
  asCSV: boolean;
}