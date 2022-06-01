
export default interface OptimizerResults {
  username: string;
  runDateTime: Date;
  timeToRun: Date;
  qualityLevel: number;
  baseTotalIncome: number;
  boostedTotalIncome: number;

  optimizedCollections: OptimizerCollectionResult[];
  unfilledCollections: OptimizerCollectionResult[];
  unoptimizedCollections: OptimizerCollectionResult[];
  extraCollections: OptimizerCollectionResult[];
  missingCollections: OptimizerCollectionResult[];
}

export interface OptimizerCollectionResult {
  isStandardCollection: boolean;
  city: string;
  name: string;
  category: string;
  boost: number;
  missingProps: number;

  properties: OptimizerCollectionProperty[];
}

export interface OptimizerCollectionProperty {
  address: string;
  baseIncome: number;
}