import { type Direction, type Position, TABLE_SIZE } from './types';

export const isValidPosition = (x: number, y: number): boolean => {
  return x >= 0 && x < TABLE_SIZE && y >= 0 && y < TABLE_SIZE;
};

export const getNextPosition = (x: number, y: number, facing: Direction): Position => {
  switch (facing) {
    case 'NORTH': return { x, y: y + 1 };
    case 'SOUTH': return { x, y: y - 1 };
    case 'EAST': return { x: x + 1, y };
    case 'WEST': return { x: x - 1, y };
  }
};

export const getRobotRotationClass = (facing: Direction | null): string => {
  switch (facing) {
    case 'NORTH': return 'robot-north';
    case 'EAST': return 'robot-east';
    case 'SOUTH': return 'robot-south';
    case 'WEST': return 'robot-west';
    default: return 'robot-north';
  }
};