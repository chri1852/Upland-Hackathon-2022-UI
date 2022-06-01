import AppraisalResults from "../../common/types/AppraisalResults";

export interface AppraisalState {
  isLoadingAppraisal: boolean;
  hasError: boolean;
  errorMessage: string;
  
  appraisalResults: AppraisalResults;
  runFound: boolean;

  runRequested: boolean;
  notEnoughRuns: boolean;
}