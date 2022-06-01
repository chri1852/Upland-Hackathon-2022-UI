import OptimizerResults from "../../common/types/OptimizerResults";

export interface OptimizerState {
  isLoadingOptimization: boolean;
  hasError: boolean;
  errorMessage: string;
  
  optimizerResults: OptimizerResults;
  runFound: boolean;
  runCompleted: boolean;
  runFailed: boolean;

  runRequested: boolean;
  notEnoughRuns: boolean;

  sortBy: string;
}