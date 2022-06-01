import CachedSaleHistoryEntryProperty from './CachedSaleHistoryEntryProperty';

export default interface CachedSaleHistoryEntry {
  transactionDateTime: Date,
  seller: string,
  buyer: string,
  price?: number,
  markup?: number,
  currency: string,
  offer: boolean,
  property: CachedSaleHistoryEntryProperty,
  offerProperty: CachedSaleHistoryEntryProperty
}