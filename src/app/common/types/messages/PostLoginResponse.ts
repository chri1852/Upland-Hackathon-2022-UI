
export default interface PostLoginResponse {
  message: string;
  authToken: string;
  mustEnterCode: boolean;
  otpCode: string;
}
