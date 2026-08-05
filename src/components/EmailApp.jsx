import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { Mail, Check, X, User, Forward, Reply, Trash2, FolderOpen } from 'lucide-react';
import { RibbonMenu } from './RibbonMenu';
import '../styles/EmailApp.css';

const INITIAL_EMAILS = [
  { id: 1, sender: 'HR Dept', subject: 'Ping Pong Table Request', body: 'The engineers are requesting a new ping pong table for the break room to boost morale. It will cost $1,500.', cost: 1500, stressImpact: -5, repImpact: 5, date: '10:00 AM' },
  { id: 2, sender: 'IT Dept', subject: 'Server Upgrade Needed', body: 'Our main database server is failing. We need $5,000 to replace it immediately or risk downtime.', cost: 5000, stressImpact: 10, repImpact: 0, critical: true, date: '9:30 AM' },
  { id: 3, sender: 'Marketing', subject: 'New Ad Campaign', body: 'We want to run a billboard campaign downtown. Asking for $10,000 budget.', cost: 10000, stressImpact: 0, repImpact: 10, date: 'Yesterday' },
];

function EmailApp() {
  const { dispatch } = useGame();
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState(emails[0] || null);

  const handleDecision = (action) => {
    if (!selectedEmail) return;

    if (action === 'approve' || action === 'reject') {
      const approved = action === 'approve';
      
      if (approved) {
        dispatch({ type: 'UPDATE_FUNDS', payload: -selectedEmail.cost });
        dispatch({ type: 'UPDATE_REPUTATION', payload: selectedEmail.repImpact });
        dispatch({ type: 'UPDATE_STRESS', payload: selectedEmail.stressImpact });
      } else {
        dispatch({ type: 'UPDATE_STRESS', payload: selectedEmail.critical ? 15 : 2 });
        dispatch({ type: 'UPDATE_REPUTATION', payload: selectedEmail.critical ? -10 : -2 });
      }

      dispatch({ type: 'ADVANCE_TIME', payload: 5 }); 
      
      const newEmails = emails.filter(e => e.id !== selectedEmail.id);
      setEmails(newEmails);
      setSelectedEmail(newEmails[0] || null);
    }
  };

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      menus: [
        { id: 'approve', label: 'Approve', icon: Check, action: 'approve' },
        { id: 'reject', label: 'Reject', icon: X, action: 'reject' },
        { id: 'delete', label: 'Delete', icon: Trash2 },
        { id: 'respond', label: 'Respond', icon: Reply, options: [{ label: 'Reply' }, { label: 'Forward' }] }
      ]
    },
    {
      id: 'view',
      label: 'View',
      menus: [
        { id: 'layout', label: 'Layout', icon: LayoutGrid, options: [{ label: 'Reading Pane Right' }, { label: 'Reading Pane Bottom' }] }
      ]
    }
  ];

  return (
    <div className="email-app">
      <RibbonMenu tabs={tabs} activeColor="var(--ms-outlook-blue)" onAction={handleDecision} />

      <div className="email-content-area">
        {/* Navigation Pane */}
        <div className="email-nav-pane">
           <div className="nav-item active"><Mail size={16}/> Inbox</div>
           <div className="nav-item"><Forward size={16}/> Sent Items</div>
           <div className="nav-item"><Trash2 size={16}/> Deleted Items</div>
           <div className="nav-item"><FolderOpen size={16}/> Archive</div>
        </div>

        {/* Inbox List */}
        <div className="email-list">
          <div className="list-header">Inbox</div>
          {emails.length === 0 ? (
            <div className="empty-state">All caught up!</div>
          ) : (
            emails.map(email => (
              <div 
                key={email.id} 
                className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="sender-name">{email.sender}</div>
                <div className="email-subject">{email.subject}</div>
                <div className="email-preview">{email.body.substring(0, 40)}...</div>
              </div>
            ))
          )}
        </div>

        {/* Reading Pane */}
        <div className="reading-pane">
          {selectedEmail ? (
            <div className="email-detail">
              <div className="email-header">
                 <User size={48} className="avatar" />
                 <div className="email-meta">
                   <h2>{selectedEmail.subject}</h2>
                   <div className="email-sender-line">
                     <strong>{selectedEmail.sender}</strong> &lt;{selectedEmail.sender.toLowerCase().replace(' ', '')}@contoso.com&gt;
                   </div>
                   <div className="email-date">{selectedEmail.date}</div>
                 </div>
              </div>
              <div className="email-body">
                <p>{selectedEmail.body}</p>
                <div className="financial-impact">
                  <strong>Requested Amount: </strong> ${selectedEmail.cost.toLocaleString()}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">Select an item to read</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailApp;
