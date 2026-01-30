import React from 'react';

interface OutputDisplayProps {
  output: string[];
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  if (output.length === 0) return null;

  return (
    <div className="card">
      <h2 className="card-title">📊 Output (REPORT)</h2>
      <div className="output-box">
        {output.map((line, i) => (
          <div key={i} className="output-item">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};