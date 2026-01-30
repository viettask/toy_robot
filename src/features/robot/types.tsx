export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export type Position = {
  x: number;
  y: number;
};

export type RobotState = {
  x: number | null;
  y: number | null;
  facing: Direction | null;
  placed: boolean;
};

export type HistoryType = 'success' | 'error' | 'warning' | 'info' | 'report';

export type HistoryItem = {
  message: string;
  type: HistoryType;
  timestamp: number;
  command?: string;
};

export type ExampleKey = 'a' | 'b' | 'c';

export const DIRECTIONS: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
export const TABLE_SIZE = 5;