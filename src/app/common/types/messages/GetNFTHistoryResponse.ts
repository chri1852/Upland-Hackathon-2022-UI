import WebNFTHistory from '../WebNFTHistory';

export default interface GetNFTHistoryResponse {
  message: string;
  history: WebNFTHistory[];
}
