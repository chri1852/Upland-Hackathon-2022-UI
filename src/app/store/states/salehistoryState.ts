import CachedSaleHistoryEntry from '../../common/types/CachedSaleHistoryEntry';
import WebCollection from '../../common/types/WebCollection';
import WebSaleHistoryFilters from '../../common/types/WebSaleHistoryFilters';
import WebNeighborhood from '../../common/types/WebNeighborhood';
import { KeyValuePair } from '../../common/types/KeyValuePair';

export interface SaleHistoryState {
  saleHistoryEntries: CachedSaleHistoryEntry[];

  isLoadingSaleHistoryEntries: boolean;
  hasErrorSaleHistoryEntries: boolean;
  errorSaleHistoryEntriesMessage: string;

  saleHistoryFormState: WebSaleHistoryFilters;
  saleHistorySelectedCollections: WebCollection[],
  saleHistorySelectedNeighborhoods: WebNeighborhood[],
  saleHistorySelectedSearchType: number,
}