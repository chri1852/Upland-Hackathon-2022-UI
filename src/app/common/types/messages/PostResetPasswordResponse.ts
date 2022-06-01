
export default interface PostLoginResponse {
  message: string;
  authToken: string;
  logicError: boolean;
  address: string;
  price: number;
}
