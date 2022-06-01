
export default interface AppraisalResults {
  username: string;
  runDateTime: Date;

  properties: AppraisalProperty[];
}

export interface PropertyAppraisalFigure {
  type: string;
  value: number;
}

export interface AppraisalProperty {
  city: string;
  address: string;
  size: number;
  collections: number[];
  mint: number;
  lowerValue: number;
  middleValue: number;
  upperValue: number;
  note: string;
  figures: PropertyAppraisalFigure[];
}