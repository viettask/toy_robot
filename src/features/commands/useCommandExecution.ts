import { useState } from 'react';
import { type RobotState, type HistoryItem, type HistoryType, type Direction, DIRECTIONS } from '../robot/types';
import { isValidPosition, getNextPosition } from '../robot/robotUtils';

export const useCommandExecution = () => {
  const [robot, setRobot] = useState<RobotState>({
    x: null,
    y: null,
    facing: null,
    placed: false
  });
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const executeCommandsBatch = async (commandsText: string): Promise<void> => {
    setOutput([]);
    setHistory([]);
    setIsAnimating(true);

    let currentRobot: RobotState = {
      x: null,
      y: null,
      facing: null,
      placed: false
    };

    const localHistory: HistoryItem[] = [];
    const localOutput: string[] = [];

    const addLocalHistory = (message: string, type: HistoryType, command?: string): void => {
      localHistory.push({ message, type, timestamp: Date.now(), command });
      setHistory([...localHistory]);
    };

    const lines = commandsText.split('\n').filter(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));

      const trimmed = lines[i].trim().toUpperCase();

      // PLACE command
      if (trimmed.startsWith('PLACE')) {
        const match = trimmed.match(/PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)/);
        if (match) {
          const [, x, y, facing] = match;
          const newX = parseInt(x);
          const newY = parseInt(y);
          if (isValidPosition(newX, newY)) {
            currentRobot = { x: newX, y: newY, facing: facing as Direction, placed: true };
            setRobot(currentRobot);
            addLocalHistory(`✅ Placed robot at (${newX}, ${newY}) facing ${facing}`, 'success', trimmed);
          } else {
            addLocalHistory(`❌ Invalid PLACE: (${newX}, ${newY}) is off the table`, 'error', trimmed);
          }
        } else {
          addLocalHistory(`❌ Invalid PLACE command format`, 'error', trimmed);
        }
        continue;
      }

      // Check if robot is placed
      if (!currentRobot.placed || currentRobot.x === null || currentRobot.y === null || currentRobot.facing === null) {
        addLocalHistory(`⚠️ Command ignored: Robot not placed yet`, 'warning', trimmed);
        continue;
      }

      // Other commands
      switch (trimmed) {
        case 'MOVE': {
          const next = getNextPosition(currentRobot.x, currentRobot.y, currentRobot.facing);
          if (isValidPosition(next.x, next.y)) {
            currentRobot = { ...currentRobot, x: next.x, y: next.y };
            setRobot(currentRobot);
            addLocalHistory(`✅ Moved to (${next.x}, ${next.y})`, 'success', 'MOVE');
          } else {
            addLocalHistory(`⚠️ Move ignored: Would fall off table`, 'warning', 'MOVE');
          }
          break;
        }
        case 'LEFT': {
          const currentIndex = DIRECTIONS.indexOf(currentRobot.facing);
          const newFacing = DIRECTIONS[(currentIndex - 1 + 4) % 4];
          currentRobot = { ...currentRobot, facing: newFacing };
          setRobot(currentRobot);
          addLocalHistory(`🔄 Turned LEFT, now facing ${newFacing}`, 'info', 'LEFT');
          break;
        }
        case 'RIGHT': {
          const currentIndex = DIRECTIONS.indexOf(currentRobot.facing);
          const newFacing = DIRECTIONS[(currentIndex + 1) % 4];
          currentRobot = { ...currentRobot, facing: newFacing };
          setRobot(currentRobot);
          addLocalHistory(`🔄 Turned RIGHT, now facing ${newFacing}`, 'info', 'RIGHT');
          break;
        }
        case 'REPORT': {
          const report = `${currentRobot.x},${currentRobot.y},${currentRobot.facing}`;
          localOutput.push(report);
          setOutput([...localOutput]);
          addLocalHistory(`📍 REPORT: ${report}`, 'report', 'REPORT');
          break;
        }
        default:
          if (trimmed) {
            addLocalHistory(`❌ Unknown command: ${trimmed}`, 'error', trimmed);
          }
      }
    }

    setIsAnimating(false);
  };

  const executeQuickCommand = (cmd: string): void => {
    const trimmed = cmd.trim().toUpperCase();

    const addToHistory = (message: string, type: HistoryType, command?: string): void => {
      setHistory(prev => [...prev, { message, type, timestamp: Date.now(), command }]);
    };

    if (trimmed.startsWith('PLACE')) {
      const match = trimmed.match(/PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)/);
      if (match) {
        const [, x, y, facing] = match;
        const newX = parseInt(x);
        const newY = parseInt(y);
        if (isValidPosition(newX, newY)) {
          setRobot({ x: newX, y: newY, facing: facing as Direction, placed: true });
          addToHistory(`✅ Placed robot at (${newX}, ${newY}) facing ${facing}`, 'success', trimmed);
        } else {
          addToHistory(`❌ Invalid PLACE: (${newX}, ${newY}) is off the table`, 'error', trimmed);
        }
      } else {
        addToHistory(`❌ Invalid PLACE command format`, 'error', trimmed);
      }
      return;
    }

    if (!robot.placed || robot.x === null || robot.y === null || robot.facing === null) {
      addToHistory(`⚠️ Command ignored: Robot not placed yet`, 'warning', trimmed);
      return;
    }

    switch (trimmed) {
      case 'MOVE': {
        const next = getNextPosition(robot.x, robot.y, robot.facing);
        if (isValidPosition(next.x, next.y)) {
          setRobot({ ...robot, x: next.x, y: next.y });
          addToHistory(`✅ Moved to (${next.x}, ${next.y})`, 'success', 'MOVE');
        } else {
          addToHistory(`⚠️ Move ignored: Would fall off table`, 'warning', 'MOVE');
        }
        break;
      }
      case 'LEFT': {
        const currentIndex = DIRECTIONS.indexOf(robot.facing);
        const newFacing = DIRECTIONS[(currentIndex - 1 + 4) % 4];
        setRobot({ ...robot, facing: newFacing });
        addToHistory(`🔄 Turned LEFT, now facing ${newFacing}`, 'info', 'LEFT');
        break;
      }
      case 'RIGHT': {
        const currentIndex = DIRECTIONS.indexOf(robot.facing);
        const newFacing = DIRECTIONS[(currentIndex + 1) % 4];
        setRobot({ ...robot, facing: newFacing });
        addToHistory(`🔄 Turned RIGHT, now facing ${newFacing}`, 'info', 'RIGHT');
        break;
      }
      case 'REPORT': {
        const report = `${robot.x},${robot.y},${robot.facing}`;
        setOutput(prev => [...prev, report]);
        addToHistory(`📍 REPORT: ${report}`, 'report', 'REPORT');
        break;
      }
      default:
        if (trimmed) {
          addToHistory(`❌ Unknown command: ${trimmed}`, 'error', trimmed);
        }
    }
  };

  const reset = (): void => {
    setRobot({ x: null, y: null, facing: null, placed: false });
    setOutput([]);
    setHistory([]);
  };

  return {
    robot,
    output,
    history,
    isAnimating,
    executeCommandsBatch,
    executeQuickCommand,
    reset
  };
};