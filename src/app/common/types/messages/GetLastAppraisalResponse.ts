import AppraisalResults from "../AppraisalResults";

export default interface GetLastAppraisalResponse {
  message: string;
  runDate: Date;
  results: AppraisalResults;
  stringResults: string;
}