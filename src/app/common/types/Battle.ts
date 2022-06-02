export default interface Battle {
  id: number,
  containerId: number,
  opponentBattleAssetId: number,
  challengerBattleAssetId: number,
  upxPerSide: number,
  mustBattleBy: Date,
  resolved: boolean,
  winnerBattleAssetId: number,
  opponentSkills: string,
  challengerSkills: string,
}