
export interface LoginState {
  uplandUsername: string;
  verifyPropAddress: string;
  verifyPropPrice: number;
  isLoading: boolean;
  verificationNeeded: boolean;
  hasError: boolean;
  errorMessage: string;
  authTokenSet: boolean;
  mustEnterCode: boolean;
  otpCode: string;
}