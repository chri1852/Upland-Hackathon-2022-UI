import CachedSaleHistoryEntry from "../CachedSaleHistoryEntry";

export default interface PostSaleHistoryResponse {
  message: string;
  saleHistoryEntries: CachedSaleHistoryEntry[];
  csvString: string;
}