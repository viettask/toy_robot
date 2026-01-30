import React from 'react';
import { Bot, Play } from 'lucide-react';
import type { RobotState } from '../../features/robot/types';

interface QuickControlsProps {
  robot: RobotState;
  onCommand: (cmd: string) => void;
}

export const QuickControls: React.FC<QuickControlsProps> = ({ robot, onCommand }) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <Play size={24} />
        Quick Controls
      </h2>
      <div className="button-grid">
        <button
          onClick={() => onCommand('PLACE 2,2,NORTH')}
          className="btn btn-primary btn-full-width"
        >
          <Bot size={20} />
          PLACE at Center
        </button>

        <button
          onClick={() => onCommand('MOVE')}
          className="btn btn-green"
          disabled={!robot.placed}
        >
          ⬆️ MOVE
        </button>

        <button
          onClick={() => onCommand('REPORT')}
          className="btn btn-purple"
          disabled={!robot.placed}
        >
          📍 REPORT
        </button>

        <button
          onClick={() => onCommand('LEFT')}
          className="btn btn-grey"
          disabled={!robot.placed}
        >
          ↶ LEFT
        </button>

        <button
          onClick={() => onCommand('RIGHT')}
          className="btn btn-orange"
          disabled={!robot.placed}
        >
          ↷ RIGHT
        </button>
      </div>
    </div>
  );
};