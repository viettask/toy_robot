import React from 'react';
import { TestTube } from 'lucide-react';
import type { ExampleKey } from '../../features/robot/types';

interface ExamplesProps {
  onLoadExample: (example: ExampleKey) => void;
}

export const Examples: React.FC<ExamplesProps> = ({ onLoadExample }) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <TestTube size={24} />
        Examples
      </h2>
      <div className="button-grid">
        <button onClick={() => onLoadExample('a')} className="btn example-btn">
          Example A
        </button>
        <button onClick={() => onLoadExample('b')} className="btn example-btn">
          Example B
        </button>
        <button onClick={() => onLoadExample('c')} className="btn example-btn">
          Example C
        </button>
      </div>
    </div>
  );
};