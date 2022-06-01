
export default interface GetMapResponse {

  message: string;
  mapFound: boolean;
  mapCreationDateTime: Date;
  city: string;
  mapType: string;
  mapFilePath: string;
  notEnoughRuns: boolean;
}
