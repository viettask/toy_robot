import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import './App.css';

import { useCommandExecution } from './features/commands/useCommandExecution';
import { Instructions } from './components/Instructions/Instructions';
import { RobotGrid } from './components/Grid/RobotGrid';
import { RobotStatus } from './components/Status/RobotStatus';
import { QuickControls } from './components/Controls/QuickControls';
import { ManualInput } from './components/Controls/ManualInput';
import { Examples } from './components/Controls/Examples';
import { OutputDisplay } from './components/Output/OutputDisplay';
import { ExecutionHistory } from './components/Output/ExecutionHistory';
import type { ExampleKey } from './features/robot/types';

const EXAMPLES: Record<ExampleKey, string> = {
  a: 'PLACE 0,0,NORTH\nMOVE\nREPORT',
  b: 'PLACE 0,0,NORTH\nLEFT\nREPORT',
  c: 'PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT',
};

const App: React.FC = () => {
  const [commands, setCommands] = useState<string>('');
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const {
    robot,
    output,
    history,
    isAnimating,
    executeCommandsBatch,
    executeQuickCommand,
    reset
  } = useCommandExecution();

  const handleExecuteCommands = () => {
    executeCommandsBatch(commands);
  };

  const handleReset = () => {
    reset();
    setCommands('');
  };

  const loadExample = (example: ExampleKey) => {
    const exampleCommands = EXAMPLES[example];
    setCommands(exampleCommands);
    
    setTimeout(() => {
      executeCommandsBatch(exampleCommands);
    }, 100);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="header">
          <div className="header-flex">
            <Bot className="header-icon pulse-animation" size={64} />
            <h1 className="title">Toy Robot</h1>
          </div>
        </div>

        <Instructions 
          showInstructions={showInstructions}
          setShowInstructions={setShowInstructions}
        />

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">🤖 5×5 Grid Table</h2>
          </div>
          <RobotGrid robot={robot} />
          <RobotStatus robot={robot} />
        </div>

        <div className="card instructions-card">
          <h2 className="card-title instructions-title">⌨️ Commands</h2>

          <div className="main-grid">
            <div className="left-panel">
              <QuickControls robot={robot} onCommand={executeQuickCommand} />
              <OutputDisplay output={output} />
              <ExecutionHistory history={history} />
            </div>

            <div className="middle-panel">
              <ManualInput
                commands={commands}
                setCommands={setCommands}
                onExecute={handleExecuteCommands}
                onReset={handleReset}
                isAnimating={isAnimating}
              />
            </div>

            <div className="right-panel">
              <Examples onLoadExample={loadExample} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;