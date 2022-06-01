export default interface GetRegisteredUserRunCountResponse {
  message: string;

  registeredUser: boolean;
  supporter: boolean;
  runCount: number;
  maxRuns: number;
  upxToSupporter: number;
  upxToNextRun: number;
}
