import WebSaleHistoryFilters from '../WebSaleHistoryFilters';

export default interface PostSaleHistoryRequest {
  filters: WebSaleHistoryFilters;
  asCSV: boolean;
}