import React from 'react';
import type { HistoryItem } from '../../features/robot/types';

interface ExecutionHistoryProps {
  history: HistoryItem[];
}

export const ExecutionHistory: React.FC<ExecutionHistoryProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="card">
      <h2 className="card-title">📜 Execution History</h2>
      <div className="history-box">
        {history.map((item, i) => (
          <div key={i} className={`history-item history-${item.type}`}>
            <span className="history-number">{i + 1}.</span>
            {item.command && <strong>[{item.command}] </strong>}
            {item.message}
          </div>
        ))}
      </div>
    </div>
  );
};