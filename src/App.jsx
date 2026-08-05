import React from 'react';
import { GameProvider, useGame } from './context/GameStateContext';
import StartScreen from './pages/StartScreen';
import DesktopDashboard from './pages/DesktopDashboard';
import './styles/globals.css';

function GameCoordinator() {
  const { state } = useGame();

  if (!state.deviceLayout) {
    return <StartScreen />;
  }

  return <DesktopDashboard />;
}

function App() {
  return (
    <GameProvider>
      <GameCoordinator />
    </GameProvider>
  );
}

export default App;
