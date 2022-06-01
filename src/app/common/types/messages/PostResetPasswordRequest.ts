
export default interface PostResetPasswordRequest {
  username: string;
  password: string;
  isClearRequest: boolean;
}
