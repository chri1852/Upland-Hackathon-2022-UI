import { KeyValuePair } from "./KeyValuePair";
import WebCollection from "./WebCollection";

export default interface WebForSaleFilters {
  cityId: number,
  owner: string,
  address: string,
  neighborhoodIds: number[],
  collectionIds: number[],
  buildings: string[],
  fsa?: boolean,
  currency: string,
  asc: boolean,
  orderBy: string,
  pageSize: number,
  page: number
}