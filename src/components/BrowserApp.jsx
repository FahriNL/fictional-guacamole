import React from 'react';
import { useGame } from '../context/GameStateContext';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Star, MoreVertical, Briefcase, Share2, MessageSquare } from 'lucide-react';
import '../styles/BrowserApp.css';

function BrowserApp() {
  const { state } = useGame();

  return (
    <div className="browser-app">
      {/* Chrome UI Header */}
      <div className="browser-header">
        <div className="browser-tabs">
          <div className="browser-tab active">
            <div className="tab-icon linkedout-icon">in</div>
            <div className="tab-title">CEO Profile | LinkedOut</div>
            <div className="tab-close">×</div>
          </div>
          <div className="browser-new-tab">+</div>
        </div>
        <div className="browser-toolbar">
          <div className="browser-nav-btns">
            <ArrowLeft size={16} color="#5f6368" />
            <ArrowRight size={16} color="#d1d3d4" />
            <RotateCw size={16} color="#5f6368" />
            <Home size={16} color="#5f6368" />
          </div>
          <div className="browser-address-bar">
            <Search size={14} color="#5f6368" />
            <span className="url">https://www.linkedout.com/in/ceo-contoso</span>
            <Star size={14} color="#5f6368" />
          </div>
          <div className="browser-extensions">
             <MoreVertical size={16} color="#5f6368" />
          </div>
        </div>
        <div className="browser-bookmarks">
          <div className="bookmark-item">Contoso Intranet</div>
          <div className="bookmark-item">Stock Market</div>
          <div className="bookmark-item">News</div>
        </div>
      </div>

      {/* Webpage Content: LinkedOut */}
      <div className="browser-viewport">
        <div className="linkedout-page">
           <div className="lo-navbar">
             <div className="lo-logo">Linked<span className="in-box">out</span></div>
             <div className="lo-search"><Search size={14} /> Search</div>
             <div className="lo-nav-icons">
               <Home size={20} />
               <Briefcase size={20} />
               <MessageSquare size={20} />
             </div>
           </div>

           <div className="lo-main-container">
             <div className="lo-left-sidebar">
                <div className="lo-profile-card">
                   <div className="lo-cover-photo"></div>
                   <div className="lo-avatar"></div>
                   <h2>Chief Executive Officer</h2>
                   <p>Contoso Corp • Driving Innovation</p>
                   <div className="lo-stats-divider"></div>
                   <div className="lo-stat-row">
                     <span>Profile views</span>
                     <span className="lo-stat-value">1,342</span>
                   </div>
                   <div className="lo-stat-row">
                     <span>Connections</span>
                     <span className="lo-stat-value">500+</span>
                   </div>
                </div>
             </div>
             
             <div className="lo-feed">
               <div className="lo-dashboard-box">
                  <h3>Your CEO Dashboard</h3>
                  <p className="lo-private-badge">Private to you</p>
                  
                  <div className="lo-metrics-grid">
                    <div className="lo-metric">
                       <span className="metric-num">{state.reputation}%</span>
                       <span className="metric-label">Public Reputation</span>
                       <div className="metric-bar-bg">
                         <div className="metric-bar-fill" style={{width: `${state.reputation}%`, backgroundColor: state.reputation > 50 ? '#057642' : '#d11124'}}></div>
                       </div>
                    </div>
                    
                    <div className="lo-metric">
                       <span className="metric-num">{state.stress}%</span>
                       <span className="metric-label">Stress Level</span>
                       <div className="metric-bar-bg">
                         <div className="metric-bar-fill" style={{width: `${state.stress}%`, backgroundColor: state.stress > 70 ? '#d11124' : '#eebb00'}}></div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="lo-insights">
                    <h4>Current Status:</h4>
                    <p>
                      {state.reputation >= 80 ? "The public loves your leadership. Keep it up!" : 
                       state.reputation >= 50 ? "Your reputation is average. Be careful with those decisions." :
                       "Your reputation is tanking. The board is watching closely."}
                    </p>
                    <p>
                      {state.stress >= 80 ? "WARNING: You are on the verge of a burnout!" : 
                       state.stress >= 50 ? "You are feeling the pressure of the job." :
                       "You are cool, calm, and collected."}
                    </p>
                  </div>
               </div>

               <div className="lo-post-creation">
                 <div className="lo-avatar-small"></div>
                 <button className="lo-post-btn">Start a post about your company...</button>
               </div>
               
               {/* Feed Posts */}
               <div className="lo-post">
                  <div className="lo-post-header">
                     <div className="lo-avatar-small"></div>
                     <div>
                       <strong>Business Insider</strong>
                       <p>12h • Edited</p>
                     </div>
                  </div>
                  <div className="lo-post-body">
                    Contoso Corp continues to make waves in the industry. But what goes on behind closed doors? We take a look at the daily decisions shaping the company's future.
                  </div>
                  <div className="lo-post-actions">
                     <button><Share2 size={16}/> Share</button>
                  </div>
               </div>
             </div>
             
             <div className="lo-right-sidebar">
                <div className="lo-widget">
                  <h3>LinkedOut News</h3>
                  <ul>
                    <li>Tech stocks soar</li>
                    <li>The future of AI in the workplace</li>
                    <li>Remote work trends 2026</li>
                  </ul>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default BrowserApp;
