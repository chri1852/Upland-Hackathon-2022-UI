import WebForSaleFilters from '../WebForSaleFilters';

export default interface PostPropertiesUnmintedRequest {
  filters: WebForSaleFilters;
  asCSV: boolean;
}