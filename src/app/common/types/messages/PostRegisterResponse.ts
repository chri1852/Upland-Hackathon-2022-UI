
export default interface PostRegisterResponse {
  message: string;
  authToken: string;
  logicError: boolean;
  address: string;
  price: number;
}
