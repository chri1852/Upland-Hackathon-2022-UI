export default interface CachedForSaleProperty {
  id: number,
  address: string,
  cityId: number,
  neighborhoodId: number,
  streetId: number,
  size: number,
  fsa: boolean,
  price: number,
  currency: string,
  owner: string,
  mint: number,
  markup: number,
  building: string,
  collectionIds: number[],
  sortValue: number
}