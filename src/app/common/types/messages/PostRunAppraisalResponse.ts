import AppraisalResults from "../AppraisalResults";

export default interface PostRunAppraisalResponse {
  message: string;
  runDate: Date;
  results: AppraisalResults;
  notEnoughRuns: boolean;
}