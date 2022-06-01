import WebNFT from './WebNFT';

export default interface WebNFTFilters {
  filters: WebNFT,
  includeBurned: boolean,
  sortBy: string,
  sortDescending: boolean,
  category: string,
  pageSize: number,
  page: number,
  noPaging: boolean
}