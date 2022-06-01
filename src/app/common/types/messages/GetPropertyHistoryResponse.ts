import UIPropertyHistory from '../UIPropertyHistory';

export default interface GetPropertyHistoryResponse {
  message: string;
  history: UIPropertyHistory[];
}