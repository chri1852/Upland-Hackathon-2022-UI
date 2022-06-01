import { CollatedStatsObject } from "../CollatedStatsObject";

export default interface GetStatsResponse {
  message: string;
  type: number;
  stats: CollatedStatsObject[];
}