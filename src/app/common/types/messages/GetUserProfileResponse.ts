import UserProfile from '../UserProfile';

export default interface GetUserProfileResponse {
  message: string;
  userProfile: UserProfile;
}
