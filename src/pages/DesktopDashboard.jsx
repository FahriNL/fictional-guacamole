import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { 
  Menu, Wifi, Volume2, Battery, UserCircle, 
  Mail, FileText, LayoutGrid, X, Minus, Square,
  Compass, Building2, ChevronUp, Power
} from 'lucide-react';
import '../styles/DesktopDashboard.css';

// Apps
import EmailApp from '../components/EmailApp';
import DocumentApp from '../components/DocumentApp';
import SpreadsheetApp from '../components/SpreadsheetApp';
import BrowserApp from '../components/BrowserApp';
import BankApp from '../components/BankApp';

function DesktopDashboard() {
  const { state } = useGame();
  const [activeApp, setActiveApp] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const openApp = (appId) => {
    setActiveApp(appId);
    setIsMaximized(false);
    setIsStartMenuOpen(false);
  };

  const closeApp = () => {
    setActiveApp(null);
    setIsMaximized(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const renderAppContent = () => {
    switch (activeApp) {
      case 'email': return <EmailApp />;
      case 'doc': return <DocumentApp />;
      case 'excel': return <SpreadsheetApp />;
      case 'browser': return <BrowserApp />;
      case 'bank': return <BankApp />;
      default: return null;
    }
  };

  const getAppTitle = () => {
    switch (activeApp) {
      case 'email': return <><Mail size={14} className="title-icon"/> Outlook</>;
      case 'doc': return <><FileText size={14} className="title-icon"/> Word</>;
      case 'excel': return <><LayoutGrid size={14} className="title-icon"/> Excel</>;
      case 'browser': return <><Compass size={14} className="title-icon"/> Chrome</>;
      case 'bank': return <><Building2 size={14} className="title-icon"/> Contoso Bank</>;
      default: return null;
    }
  };

  return (
    <div className={`desktop-environment ${state.deviceLayout === 'Phone' ? 'mobile-layout' : 'pc-layout'}`}>
      
      <div className="desktop-area" onClick={() => isStartMenuOpen && setIsStartMenuOpen(false)}>
        <div className="desktop-icons">
          <button className="desktop-icon" onClick={() => openApp('email')}>
            <div className="icon-wrapper outlook-theme">
              <Mail size={32} />
            </div>
            <span>Outlook</span>
          </button>
          
          <button className="desktop-icon" onClick={() => openApp('doc')}>
            <div className="icon-wrapper word-theme">
              <FileText size={32} />
            </div>
            <span>Word</span>
          </button>
          
          <button className="desktop-icon" onClick={() => openApp('excel')}>
            <div className="icon-wrapper excel-theme">
              <LayoutGrid size={32} />
            </div>
            <span>Excel</span>
          </button>

          <button className="desktop-icon" onClick={() => openApp('browser')}>
            <div className="icon-wrapper chrome-theme">
              <Compass size={32} />
            </div>
            <span>Chrome</span>
          </button>

          <button className="desktop-icon" onClick={() => openApp('bank')}>
            <div className="icon-wrapper bank-theme">
              <Building2 size={32} />
            </div>
            <span>Bank</span>
          </button>
        </div>

        {/* Start Menu */}
        {isStartMenuOpen && (
          <div className="start-menu acrylic ms-panel" onClick={(e) => e.stopPropagation()}>
             <div className="start-menu-header">
                <h3>Pinned Apps</h3>
             </div>
             <div className="start-menu-grid">
                <button className="start-app-btn" onClick={() => openApp('email')}>
                  <Mail size={24} color="var(--ms-outlook-blue)" /> Outlook
                </button>
                <button className="start-app-btn" onClick={() => openApp('doc')}>
                  <FileText size={24} color="var(--ms-word-blue)" /> Word
                </button>
                <button className="start-app-btn" onClick={() => openApp('excel')}>
                  <LayoutGrid size={24} color="var(--ms-excel-green)" /> Excel
                </button>
                <button className="start-app-btn" onClick={() => openApp('browser')}>
                  <Compass size={24} color="#EA4335" /> Chrome
                </button>
                <button className="start-app-btn" onClick={() => openApp('bank')}>
                  <Building2 size={24} color="#0F9D58" /> Bank
                </button>
             </div>
             <div className="start-menu-footer">
                <div className="user-profile">
                  <UserCircle size={32} /> CEO Account
                </div>
                <button className="power-btn" onClick={() => alert('Shut down not implemented yet!')}>
                  <Power size={20} />
                </button>
             </div>
          </div>
        )}

        {/* Window Manager */}
        {activeApp && (
          <div className={`app-window ms-panel ${isMaximized ? 'maximized' : ''}`}>
            <div className="window-titlebar" onDoubleClick={toggleMaximize}>
              <div className="window-title">
                {getAppTitle()}
              </div>
              <div className="window-controls">
                <button className="window-ctrl-btn minimize-btn"><Minus size={16} /></button>
                <button className="window-ctrl-btn maximize-btn" onClick={toggleMaximize}>
                  {isMaximized ? <ChevronUp size={14} /> : <Square size={14} />}
                </button>
                <button className="window-ctrl-btn close-btn" onClick={closeApp}><X size={16} /></button>
              </div>
            </div>
            <div className="window-content">
              {renderAppContent()}
            </div>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div className="taskbar acrylic">
        <div className="taskbar-left">
          <button className={`start-btn ${isStartMenuOpen ? 'active' : ''}`} onClick={toggleStartMenu}>
            <Menu size={20} />
          </button>
          
          <div className="taskbar-apps">
             {activeApp && (
               <div className="taskbar-app-icon active-app-icon">
                 {activeApp === 'email' && <Mail size={20} color="var(--ms-outlook-blue)" />}
                 {activeApp === 'doc' && <FileText size={20} color="var(--ms-word-blue)" />}
                 {activeApp === 'excel' && <LayoutGrid size={20} color="var(--ms-excel-green)" />}
                 {activeApp === 'browser' && <Compass size={20} color="#EA4335" />}
                 {activeApp === 'bank' && <Building2 size={20} color="#0F9D58" />}
               </div>
             )}
          </div>
        </div>

        <div className="taskbar-center">
           <div className="ceo-stats">
              <span className="stat" title="Company Funds">
                <span className="stat-label">FUNDS:</span>
                <span className="stat-value">${state.funds.toLocaleString()}</span>
              </span>
              <span className="stat" title="Stress Level">
                <span className="stat-label">STRESS:</span>
                <span className="stat-value">{state.stress}%</span>
              </span>
              <span className="stat" title="Company Reputation">
                <span className="stat-label">REP:</span>
                <span className="stat-value">{state.reputation}%</span>
              </span>
           </div>
        </div>

        <div className="taskbar-right">
          <div className="system-tray">
             <Wifi size={16} />
             <Volume2 size={16} />
             <Battery size={16} />
          </div>
          <div className="clock-widget">
            <span>{formatTime(state.time)}</span>
            <span>Day {state.day}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DesktopDashboard;
