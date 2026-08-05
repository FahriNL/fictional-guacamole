import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { Edit2, Check, X, FileSignature, Save, Copy, FileText } from 'lucide-react';
import { RibbonMenu } from './RibbonMenu';
import '../styles/DocumentApp.css';

const DOCS = [
  {
    id: 1,
    title: 'Policy Update 2026',
    content: 'All employees are required to work on weekends without overtime pay effective immediately.',
    violation: true,
  },
  {
    id: 2,
    title: 'Press Release - Q3 Earnings',
    content: 'Contoso Corp is thrilled to announce a 45% increase in profits this quarter, driven by our new AI initiatives. We thank our dedicated team for their hard work.',
    violation: false,
  }
];

function DocumentApp() {
  const { dispatch } = useGame();
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const doc = DOCS[currentDocIndex];

  const handleAction = (action) => {
    if (completed || !doc) return;

    if (action === 'approve' || action === 'reject') {
      const isApproved = action === 'approve';
      const isCorrectDecision = doc.violation ? !isApproved : isApproved;

      if (isCorrectDecision) {
        dispatch({ type: 'UPDATE_REPUTATION', payload: 5 });
        dispatch({ type: 'UPDATE_STRESS', payload: -2 });
      } else {
        dispatch({ type: 'UPDATE_REPUTATION', payload: -10 });
        dispatch({ type: 'UPDATE_STRESS', payload: 15 });
      }

      dispatch({ type: 'ADVANCE_TIME', payload: 15 });

      if (currentDocIndex < DOCS.length - 1) {
        setCurrentDocIndex(currentDocIndex + 1);
      } else {
        setCompleted(true);
      }
    }
  };

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      menus: [
        { id: 'clipboard', label: 'Copy', icon: Copy },
        { id: 'font', label: 'Format', icon: Edit2, options: [{ label: 'Bold' }, { label: 'Italic' }] }
      ]
    },
    {
      id: 'review',
      label: 'Review',
      menus: [
        { id: 'approve', label: 'Approve', icon: Check, action: 'approve' },
        { id: 'reject', label: 'Reject', icon: X, action: 'reject' }
      ]
    },
    {
      id: 'view',
      label: 'View',
      menus: [
        { id: 'print', label: 'Print Layout', icon: FileText }
      ]
    }
  ];

  return (
    <div className="document-app">
      <RibbonMenu tabs={tabs} activeColor="var(--ms-word-blue)" onAction={handleAction} />

      <div className="document-workspace">
        {completed ? (
           <div className="empty-state">No more documents to review.</div>
        ) : (
          <div className="document-page">
            <div className="page-header">
              <FileSignature size={48} className="doc-icon" />
              <h1>{doc.title}</h1>
              <div className="doc-meta">Confidential - Internal Use Only</div>
            </div>
            <div className="page-content">
              <p>{doc.content}</p>
            </div>
            
            <div className="page-footer">
               <div className="signature-line">
                 <span>CEO Signature:</span>
                 <div className="sign-box">Pending Review</div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentApp;
