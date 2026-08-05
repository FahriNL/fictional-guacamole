import React from 'react';
import { useGame } from '../context/GameStateContext';
import { Monitor, Smartphone, Briefcase } from 'lucide-react';
import '../styles/StartScreen.css';

function StartScreen() {
  const { dispatch } = useGame();

  const handleSelectLayout = (layout) => {
    dispatch({ type: 'SET_LAYOUT', payload: layout });
  };

  return (
    <div className="start-screen acrylic">
      <div className="login-panel ms-panel">
        <div className="login-header">
          <Briefcase size={48} className="logo-icon" color="var(--ms-blue)" />
          <h1>CEO Simulator</h1>
          <p>Sign in to your corporate account</p>
        </div>
        
        <div className="layout-selection">
          <p>Select your primary workstation:</p>
          <div className="layout-buttons">
            <button 
              className="layout-btn"
              onClick={() => handleSelectLayout('PC')}
            >
              <Monitor size={32} />
              <span>Desktop (PC)</span>
            </button>
            <button 
              className="layout-btn"
              onClick={() => handleSelectLayout('Phone')}
            >
              <Smartphone size={32} />
              <span>Mobile Device</span>
            </button>
          </div>
        </div>
        
        <div className="login-footer">
          <p>Contoso Corp Secure Login</p>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
