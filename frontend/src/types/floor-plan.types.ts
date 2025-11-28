export type Floor =
  | 'minusOne'
  | 'minusTwo'
  | 'minusThree'
  | 'ground'
  | 'first'
  | 'second'
  | 'third';

export interface FloorPlanSelection {
  floor: Floor;
  floorLabel: string;
  imagePath: string;
  x: number;
  y: number;
}
