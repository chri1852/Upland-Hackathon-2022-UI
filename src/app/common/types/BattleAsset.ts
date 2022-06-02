export default interface BattleAsset {
  id: number,
  assetId: number,
  assetCategory: string,
  assetName: string,
  thumbnail: string,
  rockSkill: number,
  paperSkill: number,
  sissorsSkill: number,
  isTraining: boolean,
  isBattling: boolean,
}