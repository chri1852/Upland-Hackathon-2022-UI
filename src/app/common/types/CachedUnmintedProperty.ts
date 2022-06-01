export default interface CachedUnmintedProperty {
  id: number,
  address: string,
  cityId: number,
  neighborhoodId: number,
  streetId: number,
  size: number,
  fsa: boolean,
  mint: number,
  collectionIds: number[]
}