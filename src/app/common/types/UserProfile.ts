import WebNFT from './WebNFT';
import WebSparkHistory from './WebSparkHistory';
import BattleAsset from './BattleAsset';

export default interface UserProfile {
  username: string;
  eosAccount: string;
  avatarLink: string;
  avatarColor: string;
  rank: string;
  networth: number;
  jailed: boolean;

  registeredUser: boolean;
  supporter: boolean;
  registeredUserId: number;
  runCount: number;
  maxRuns: number;
  upxToSupporter: number;
  upxToNextRun: number;

  collections: UserProfileCollection[];
  badges: UserProfileBadge[];
  properties: UserProfileProperty[];

  profileNFTs: WebNFT[];

  joined: Date;
  unstakedSpark: number;
  stakedSpark: number;
  monthlyEarnings: number;
  sparkHistory: WebSparkHistory[];

  id: string;
  eosId: string;
  level: string;
  avatarUrl: string;
  initialCity: string;
  currentCity: string;
  battleAssets: BattleAsset[];

}

export interface UserProfileCollection {
  id: number;
  name: string;
  image: string;
  cityId: number;
}

export interface UserProfileBadge {
  id: number;
  name: string;
  image: string;
}

export interface UserProfileProperty {
  propertyId: number;
  address: string;
  city: string;
  neighborhood: string;
  size: number;
  mint: number;
  status: string;
  building: string;
  collectionIds: number[];
  boost: number;

  minted: boolean;
  acquiredOn: Date;
}