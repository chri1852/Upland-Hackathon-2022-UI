export default interface WebSaleHistoryFilters {
  cityIdSearch: boolean,
  searchByUsername?: string,
  searchByCityId?: number,
  noSales: boolean,
  noSwaps: boolean,
  noOffers: boolean,
  currency: string,
  address: string,
  username: string,
  neighborhoodIds: number[],
  collectionIds: number[],
  fromDate: Date,
  toDate: Date,
  pageSize: number,
  page: number
}