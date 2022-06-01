import WebForSaleFilters from '../WebForSaleFilters';

export default interface PostPropertiesForSaleRequest {
  filters: WebForSaleFilters;
  asCSV: boolean;
}