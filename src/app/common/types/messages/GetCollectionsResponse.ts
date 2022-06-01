import WebCollection from "../WebCollection";

export default interface GetCollectionsResponse {
  message: string;
  collections: WebCollection[];
}