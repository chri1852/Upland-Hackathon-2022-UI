import WebNeighborhood from "../WebNeighborhood";

export default interface GetNeighborhoodsResponse {
  message: string;
  neighborhoods: WebNeighborhood[];
}