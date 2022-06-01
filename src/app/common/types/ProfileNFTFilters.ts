export default interface ProfileNFTFilters {
  name: string;
  team: string;
  season: string;
  position: string;
  model: string;
  opponent: string;
  homeTeam: string;
  series: string;
  description: string;
  rarity: string;
  buildingType: string;
  address: string;

  mintSort: number;
  nameSort: number;
  teamSort: number;
  seasonSort: number;
  positionSort: number;
  fanPointsSort: number;
  modelSort: number;
  gameDateSort: number;
  opponentSort: number;
  homeTeamSort: number;
  variantSort: number;
  seriesSort: number;
  raritySort: number;
  buildingTypeSort: number;
  addressSort: number;
  descriptionSort: number;
  
  pageNumber: number;
}