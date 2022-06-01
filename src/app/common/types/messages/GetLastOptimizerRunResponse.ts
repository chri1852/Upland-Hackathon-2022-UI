import OptimizerResults from '../OptimizerResults';

export default interface GetLastOptimizerRunResponse {
  message: string;
  runFound: boolean;
  runCompleted: boolean;
  runFailed: boolean;
  results: OptimizerResults;
  stringResults: string;
}
