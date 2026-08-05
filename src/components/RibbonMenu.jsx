import React, { useState } from 'react';
import '../styles/RibbonMenu.css';

export function RibbonMenu({ tabs, activeColor, onAction }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setOpenDropdown(null);
  };

  const handleMenuClick = (menuItem, e) => {
    e.stopPropagation();
    if (menuItem.options) {
      setOpenDropdown(openDropdown === menuItem.id ? null : menuItem.id);
    } else {
      setOpenDropdown(null);
      if (onAction) onAction(menuItem.action);
    }
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="ribbon-container">
      <div className="ribbon-tabs" style={{ backgroundColor: activeColor }}>
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`ribbon-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className="ribbon-toolbar-content">
        {activeTabData?.menus.map(menu => (
          <div key={menu.id} className="ribbon-menu-group" onClick={(e) => handleMenuClick(menu, e)}>
            <button className="ribbon-tool-btn">
              {menu.icon && <menu.icon size={16} />}
              <span>{menu.label}</span>
            </button>
            
            {openDropdown === menu.id && menu.options && (
              <div className="ribbon-dropdown-menu">
                {menu.options.map((opt, idx) => (
                  <div key={idx} className="dropdown-item" onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(null);
                    if(onAction) onAction(opt.action);
                  }}>
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
