import WebStreet from "../WebStreet";

export default interface GetStreetsResponse {
  message: string;
  streets  : WebStreet[];
}