import React from 'react';
import { Bot } from 'lucide-react';
import type { RobotState } from '../../features/robot/types';

interface RobotStatusProps {
  robot: RobotState;
}

export const RobotStatus: React.FC<RobotStatusProps> = ({ robot }) => {
  if (!robot.placed) {
    return (
      <div className="warning-box">
        <p>⚠️ Robot not placed. Use PLACE command first.</p>
      </div>
    );
  }

  return (
    <div className="robot-status">
      <h3 className="robot-status-title">
        <Bot size={20} />
        Robot Status
      </h3>
      <div className="status-grid">
        <div className="status-item">
          <p className="status-label">X Position</p>
          <p className="status-value status-value-blue">{robot.x}</p>
        </div>
        <div className="status-item">
          <p className="status-label">Y Position</p>
          <p className="status-value status-value-blue">{robot.y}</p>
        </div>
        <div className="status-item">
          <p className="status-label">Facing</p>
          <p className="status-value status-value-purple">{robot.facing}</p>
        </div>
      </div>
    </div>
  );
};