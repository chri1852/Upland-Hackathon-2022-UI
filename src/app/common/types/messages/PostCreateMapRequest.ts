
export default interface PostCreateMapRequest {
  username: string;
  cityId: number;
  mapType: string;
  colorBlind: boolean;
  customColors: string[];
}
