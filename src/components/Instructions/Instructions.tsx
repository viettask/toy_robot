import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InstructionsProps {
  showInstructions: boolean;
  setShowInstructions: (show: boolean) => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ showInstructions, setShowInstructions }) => {
  return (
    <div className="card instructions-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setShowInstructions(!showInstructions)}
      >
        <h2 className="card-title instructions-title" style={{ marginBottom: 0 }}>
          📖 Instructions & Rules
        </h2>
        <button
          className="btn btn-primary"
          style={{
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {showInstructions ? (
            <>
              <ChevronUp size={20} />
              Hide
            </>
          ) : (
            <>
              <ChevronDown size={20} />
              Show
            </>
          )}
        </button>
      </div>

      {showInstructions && (
        <div style={{ marginTop: '1.5rem' }}>
          <div className="instructions-grid">
            <div className="instruction-section">
              <h3 className="instruction-heading">Commands:</h3>
              <div className="box">
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="box-name box-name-yellow">PLACE X,Y,F</span>
                  <p className="box-desc">Place robot at coordinates (X,Y) facing direction F</p>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="box-name box-name-green">MOVE</span>
                  <p className="box-desc">Move one unit forward in current direction</p>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="box-name box-name-black">LEFT</span>
                  <p className="box-desc">Rotate 90° counter-clockwise</p>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="box-name box-name-orange">RIGHT</span>
                  <p className="box-desc">Rotate 90° clockwise</p>
                </div>
                <div>
                  <span className="box-name box-name-purple">REPORT</span>
                  <p className="box-desc">Output current position and direction</p>
                </div>
              </div>
            </div>
            <div className="instruction-section">
              <h3 className="instruction-heading">Rules & Constraints:</h3>
              <div className="box">
                <p className="box-desc">• Table is 5×5 units with coordinates (0-4) on each axis</p>
                <p className="box-desc">• Origin (0,0) is at the south-west (bottom-left) corner</p>
                <p className="box-desc">• First valid command must be PLACE</p>
                <p className="box-desc">• Robot cannot fall off the table - invalid moves are ignored</p>
                <p className="box-desc">• Valid directions: NORTH, SOUTH, EAST, WEST</p>
                <p className="box-desc">• Commands before valid PLACE are ignored</p>
                <p className="box-desc">• Additional PLACE commands can be used to reposition the robot</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};