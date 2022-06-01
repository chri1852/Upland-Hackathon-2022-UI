import CachedForSaleProperty from '../CachedForSaleProperty';

export default interface PostPropertiesForSaleResponse {
  message: string;
  properties: CachedForSaleProperty[];
  csvString: string;
}