# Toy Robot Challange

## Purpose

- A modern Toy Robot simulator built with React and TypeScript, featuring a clean, modular architecture for easy maintenance and extensibility.

## Contributing

Contributions from other developers who want to improve Toy Robot are welcome! 
Follow these steps to contribute effectively:

1. Fork the repository.
   Click the Fork button on Github to create your own copy of the project

2. Clone your fork
      ```bash
   git clone https://github.com/viettask/toy_robot.git
   ```
   
3. Create a new branch for your feature or fix:
      ```bash
   git checkout -b feature-or-fix-name
   ```
      
4. Make your changes, and commit them with a meaningful message:
   Update README.md if needed
      ```bash
   git commit -m "Add <feature>/Fix <issue>"
   ```

5. Push your branch to your fork:
      ```bash
   git push origin feature-or-fix-name
   ```

6. Open a Pull Request (PR) against the main repository. The repository owner will review and merge once approved.

## Features

1. Core Functionality
  - 5×5 Grid Table - Visual representation of the robot's environment with coordinate display
  - Robot Placement - Place robot at any valid position (0-4 on X and Y axes) facing NORTH, SOUTH, EAST, or WEST
  - Movement Commands - Move robot one unit forward in the current direction
  - Rotation Controls - Turn robot 90° left (counter-clockwise) or right (clockwise)
  - Position Reporting - Output current robot coordinates and facing direction
  - Safety Constraints - Prevent robot from falling off the table with automatic move validation

2. User Interface
  - Interactive Grid Visualization - Real-time robot position display with directional indicator
  - Quick Command Buttons - One-click controls for common operations (PLACE, MOVE, LEFT, RIGHT, REPORT)
  - Manual Command Input - Multi-line textarea for batch command execution
  - Collapsible Instructions - Toggle-able help section with command reference and rules
  - Robot Status Panel - Real-time display of X position, Y position, and facing direction
  - Animated Execution - Smooth command execution with 300ms delay between operations

## Repository Structure
```
src/
├── features/
│   ├── robot/
│   │   ├── types.ts              # All type definitions and constants
│   │   └── robotUtils.ts         # Robot utility functions
│   └── commands/
│       └── useCommandExecution.ts # Command execution logic (custom hook)
├── components/
│   ├── Instructions/
│   │   └── Instructions.tsx       # Collapsible instructions panel
│   ├── Grid/
│   │   └── RobotGrid.tsx         # 5x5 grid visualization
│   ├── Status/
│   │   └── RobotStatus.tsx       # Robot status display
│   ├── Controls/
│   │   ├── QuickControls.tsx     # Quick command buttons
│   │   ├── ManualInput.tsx       # Manual command input textarea
│   │   └── Examples.tsx          # Example buttons
│   └── Output/
│       ├── OutputDisplay.tsx      # REPORT output display
│       └── ExecutionHistory.tsx   # Command execution history
├── App.tsx                        # Main app component (clean and minimal)
└── App.css                        # Styles
```

## Project Setup
To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/viettask/toy_robot.git
   ```

2. Navigate into the project directory:
   ```bash
   cd toy_robot
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm start
   ```
## Acknowledgements

1. React (with React Hooks)

   Website: https://reactjs.org/

   React is a JavaScript library for building user interfaces, which powers the front-end of this app.



