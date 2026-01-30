import React from 'react';
import { FileText, Play, Trash2 } from 'lucide-react';

interface ManualInputProps {
  commands: string;
  setCommands: (commands: string) => void;
  onExecute: () => void;
  onReset: () => void;
  isAnimating: boolean;
}

export const ManualInput: React.FC<ManualInputProps> = ({
  commands,
  setCommands,
  onExecute,
  onReset,
  isAnimating
}) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <FileText size={24} />
        Manual Input
      </h2>
      <textarea
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        placeholder="Enter commands (one per line)&#10;&#10;Example:&#10;PLACE 0,0,NORTH&#10;MOVE&#10;REPORT"
        className="command-textarea"
      />

      <div className="action-buttons">
        <button
          onClick={onExecute}
          disabled={isAnimating}
          className="btn btn-execute"
        >
          <Play size={20} />
          {isAnimating ? 'Executing...' : 'Execute'}
        </button>
        <button
          onClick={onReset}
          className="btn btn-red"
        >
          <Trash2 size={20} />
          Reset
        </button>
      </div>
    </div>
  );
};