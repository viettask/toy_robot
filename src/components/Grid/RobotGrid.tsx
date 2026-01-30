import React from 'react';
import { Bot } from 'lucide-react';
import { type RobotState, TABLE_SIZE } from '../../features/robot/types';
import { getRobotRotationClass } from '../../features/robot/robotUtils';

interface RobotGridProps {
  robot: RobotState;
}

export const RobotGrid: React.FC<RobotGridProps> = ({ robot }) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <div className="direction-north">NORTH ↑</div>

        <div className="axis-label-container">
          <div className="spacer"></div>
          <div className="axis-label">X-axis →</div>
        </div>

        <div className="grid-main">
          <div className="direction-west">← WEST</div>
          <div className="y-axis-label">Y-axis ↑</div>

          <div className="y-axis-numbers">
            {[...Array(TABLE_SIZE)].map((_, y) => (
              <div key={y} className="y-axis-number">
                {y}
              </div>
            ))}
          </div>

          <div className="grid-content">
            {[...Array(TABLE_SIZE)].map((_, y) => (
              <div key={y} className="grid-row">
                {[...Array(TABLE_SIZE)].map((_, x) => {
                  const isRobot = robot.placed && robot.x === x && robot.y === (TABLE_SIZE - 1 - y);
                  return (
                    <div
                      key={x}
                      className={`grid-cell ${isRobot ? 'grid-cell-robot' : ''}`}
                    >
                      {isRobot ? (
                        <div className={`robot-icon ${getRobotRotationClass(robot.facing)}`}>
                          <Bot size={32} />
                        </div>
                      ) : (
                        <span className="cell-coordinates">{x},{TABLE_SIZE - 1 - y}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="x-axis-numbers">
              {[...Array(TABLE_SIZE)].map((_, x) => (
                <div key={x} className="x-axis-number">
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="direction-east">EAST →</div>
        </div>

        <div className="direction-south">↓ SOUTH</div>
      </div>
    </div>
  );
};