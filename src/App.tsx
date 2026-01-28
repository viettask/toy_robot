import React, { useState } from 'react';
import { Bot, Play, Trash2, FileText, ChevronDown, ChevronUp, TestTube } from 'lucide-react';
import './App.css';

// Type definitions
type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

type Position = {
  x: number;
  y: number;
};

type RobotState = {
  x: number | null;
  y: number | null;
  facing: Direction | null;
  placed: boolean;
};

type HistoryType = 'success' | 'error' | 'warning' | 'info' | 'report';

type HistoryItem = {
  message: string;
  type: HistoryType;
  timestamp: number;
};

type ExampleKey = 'a' | 'b' | 'c';

// Constants
const DIRECTIONS: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const TABLE_SIZE = 5;

const App: React.FC = () => {
  const [robot, setRobot] = useState<RobotState>({
    x: null,
    y: null,
    facing: null,
    placed: false
  });
  const [commands, setCommands] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const isValidPosition = (x: number, y: number): boolean => {
    return x >= 0 && x < TABLE_SIZE && y >= 0 && y < TABLE_SIZE;
  };

  const getNextPosition = (x: number, y: number, facing: Direction): Position => {
    switch (facing) {
      case 'NORTH': return { x, y: y + 1 };
      case 'SOUTH': return { x, y: y - 1 };
      case 'EAST': return { x: x + 1, y };
      case 'WEST': return { x: x - 1, y };
    }
  };

  const executeCommand = (cmd: string): void => {
    const trimmed = cmd.trim().toUpperCase();

    if (trimmed.startsWith('PLACE')) {
      const match = trimmed.match(/PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*(NORTH|SOUTH|EAST|WEST)/);
      if (match) {
        const [, x, y, facing] = match;
        const newX = parseInt(x);
        const newY = parseInt(y);
        if (isValidPosition(newX, newY)) {
          setRobot({ x: newX, y: newY, facing: facing as Direction, placed: true });
          addToHistory(`✅ Placed robot at (${newX}, ${newY}) facing ${facing}`, 'success');
        } else {
          addToHistory(`❌ Invalid PLACE: (${newX}, ${newY}) is off the table`, 'error');
        }
      } else {
        addToHistory(`❌ Invalid PLACE command format`, 'error');
      }
      return;
    }

    if (!robot.placed || robot.x === null || robot.y === null || robot.facing === null) {
      addToHistory(`⚠️ Command ignored: Robot not placed yet`, 'warning');
      return;
    }

    switch (trimmed) {
      case 'MOVE': {
        const next = getNextPosition(robot.x, robot.y, robot.facing);
        if (isValidPosition(next.x, next.y)) {
          setRobot({ ...robot, x: next.x, y: next.y });
          addToHistory(`✅ Moved to (${next.x}, ${next.y})`, 'success');
        } else {
          addToHistory(`⚠️ Move ignored: Would fall off table`, 'warning');
        }
        break;
      }
      case 'LEFT': {
        const currentIndex = DIRECTIONS.indexOf(robot.facing);
        const newFacing = DIRECTIONS[(currentIndex - 1 + 4) % 4];
        setRobot({ ...robot, facing: newFacing });
        addToHistory(`🔄 Turned LEFT, now facing ${newFacing}`, 'info');
        break;
      }
      case 'RIGHT': {
        const currentIndex = DIRECTIONS.indexOf(robot.facing);
        const newFacing = DIRECTIONS[(currentIndex + 1) % 4];
        setRobot({ ...robot, facing: newFacing });
        addToHistory(`🔄 Turned RIGHT, now facing ${newFacing}`, 'info');
        break;
      }
      case 'REPORT': {
        const report = `${robot.x},${robot.y},${robot.facing}`;
        setOutput(prev => [...prev, report]);
        addToHistory(`📍 REPORT: ${report}`, 'report');
        break;
      }
      default:
        if (trimmed) {
          addToHistory(`❌ Unknown command: ${trimmed}`, 'error');
        }
    }
  };

  const addToHistory = (message: string, type: HistoryType = 'info'): void => {
    setHistory(prev => [...prev, { message, type, timestamp: Date.now() }]);
  };

  const handleExecuteCommands = async (): Promise<void> => {
    setOutput([]);
    setHistory([]);
    setRobot({ x: null, y: null, facing: null, placed: false });
    setIsAnimating(true);

    const lines = commands.split('\n').filter(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      executeCommand(lines[i]);
    }

    setIsAnimating(false);
  };

  const handleQuickCommand = (cmd: string): void => {
    executeCommand(cmd);
  };

  const handleReset = (): void => {
    setRobot({ x: null, y: null, facing: null, placed: false });
    setCommands('');
    setOutput([]);
    setHistory([]);
  };

  const loadExample = (example: ExampleKey): void => {
    const examples: Record<ExampleKey, string> = {
      a: 'PLACE 0,0,NORTH\nMOVE\nREPORT',
      b: 'PLACE 0,0,NORTH\nLEFT\nREPORT',
      c: 'PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT',
    };
    const exampleCommands: string = examples[example] || '';
  setCommands(exampleCommands);

  // Execute commands directly without waiting for state
  setTimeout(async (): Promise<void> => {
    setOutput([]);
    setHistory([]);
    setRobot({ x: null, y: null, facing: null, placed: false });
    
    const lines: string[] = exampleCommands.split('\n').filter((line: string) => line.trim());
    for (let i = 0; i < lines.length; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 300));
      executeCommand(lines[i]);
    }
  }, 0);
  };

  const getRobotRotation = (): string => {
    switch (robot.facing) {
      case 'NORTH': return 'robot-north';
      case 'EAST': return 'robot-east';
      case 'SOUTH': return 'robot-south';
      case 'WEST': return 'robot-west';
      default: return 'robot-north';
    }
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Header */}
        <div className="header">
          <div className="header-flex">
            <Bot className="header-icon pulse-animation" size={64} />
            <h1 className="title">Toy Robot Simulator</h1>
          </div>
        </div>

        {/* Instructions - COLLAPSIBLE */}
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

        {/* Grid and Robot Status */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">🤖 5×5 Grid Table</h2>
          </div>

          <div className="table-container">
            <div className="table-wrapper">
              {/* NORTH label */}
              <div className="direction-north">NORTH ↑</div>

              {/* X-axis label */}
              <div className="axis-label-container">
                <div className="spacer"></div>
                <div className="axis-label">X-axis →</div>
              </div>

              <div className="grid-main">
                {/* WEST label */}
                <div className="direction-west">← WEST</div>

                {/* Y-axis label */}
                <div className="y-axis-label">Y-axis ↑</div>

                {/* Y-axis numbers */}
                <div className="y-axis-numbers">
                  {[...Array(TABLE_SIZE)].map((_, y) => (
                    <div key={y} className="y-axis-number">
                      {y}
                    </div>
                  ))}
                </div>

                {/* Grid */}
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
                              <div className={`robot-icon ${getRobotRotation()}`}>
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

                  {/* X-axis numbers */}
                  <div className="x-axis-numbers">
                    {[...Array(TABLE_SIZE)].map((_, x) => (
                      <div key={x} className="x-axis-number">
                        {x}
                      </div>
                    ))}
                  </div>
                </div>

                {/* EAST label */}
                <div className="direction-east">EAST →</div>
              </div>

              {/* SOUTH label */}
              <div className="direction-south">↓ SOUTH</div>
            </div>
          </div>

          {/* Robot Status */}
          {robot.placed ? (
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
          ) : (
            <div className="warning-box">
              <p>⚠️ Robot not placed. Use PLACE command first.</p>
            </div>
          )}
        </div>

        {/* Commands Section */}
        <div className="card instructions-card">
          <h2 className="card-title instructions-title">⌨️ Commands</h2>

          <div className="main-grid">
            {/* Left Panel - Quick Controls */}
            <div className="left-panel">
              <div className="card">
                <h2 className="card-title">
                  <Play size={24} />
                  Quick Controls
                </h2>
                <div className="button-grid">
                  <button
                    onClick={() => handleQuickCommand('PLACE 2,2,NORTH')}
                    className="btn btn-primary btn-full-width"
                  >
                    <Bot size={20} />
                    PLACE at Center
                  </button>

                  <button
                    onClick={() => handleQuickCommand('MOVE')}
                    className="btn btn-green"
                    disabled={!robot.placed}
                  >
                    ⬆️ MOVE
                  </button>

                  <button
                    onClick={() => handleQuickCommand('REPORT')}
                    className="btn btn-purple"
                    disabled={!robot.placed}
                  >
                    📍 REPORT
                  </button>

                  <button
                    onClick={() => handleQuickCommand('LEFT')}
                    className="btn btn-grey"
                    disabled={!robot.placed}
                  >
                    ↶ LEFT
                  </button>

                  <button
                    onClick={() => handleQuickCommand('RIGHT')}
                    className="btn btn-orange"
                    disabled={!robot.placed}
                  >
                    ↷ RIGHT
                  </button>
                </div>
              </div>

              {/* Output */}
              {output.length > 0 && (
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
              )}

              {/* Execution History */}
              {history.length > 0 && (
                <div className="card">
                  <h2 className="card-title">📜 Execution History</h2>
                  <div className="history-box">
                    {history.map((item, i) => (
                      <div key={i} className={`history-item history-${item.type}`}>
                        <span className="history-number">{i + 1}.</span> {item.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Command Input */}
            <div className="middle-panel">
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

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    onClick={handleExecuteCommands}
                    disabled={isAnimating}
                    className="btn btn-execute"
                  >
                    <Play size={20} />
                    {isAnimating ? 'Executing...' : 'Execute'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="btn btn-red"
                  >
                    <Trash2 size={20} />
                    Reset
                  </button>
                </div>


              </div>
            </div>

            <div className="right-panel">
              <div className="card">
                <h2 className="card-title">
                  <TestTube size={24} />
                  Examples
                </h2>
                {/* Example Buttons */}
                <div className="button-grid">
                  <button onClick={() => loadExample('a')} className="btn example-btn">
                    Example A
                  </button>
                  <button onClick={() => loadExample('b')} className="btn example-btn">
                    Example B
                  </button>
                  <button onClick={() => loadExample('c')} className="btn example-btn">
                    Example C
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
