export default interface StatsFormState {
  page: number;
  type: number;
  cityId: number;
  nameFilter: string;

  nameSort: number;
  citySort: number;
  totalPropsSort: number;
  lockedPropsSort: number;
  unlockedPropsSort: number;
  unlockedFSAPropsSort: number;
  forSalePropsSort: number;
  ownedPropsSort: number;
  percentMintedSort: number;
  percentMintedNonFSASort: number;
  buildingsCountSort: number;
  percentBuiltSort: number;
}