import React, { useState } from 'react';
import { useGame } from '../context/GameStateContext';
import { Save, Calculator, AlertCircle, FileText, LayoutGrid, HelpCircle } from 'lucide-react';
import { RibbonMenu } from './RibbonMenu';
import '../styles/SpreadsheetApp.css';

const INITIAL_DATA = [
  { id: 'marketing', dept: 'Marketing', budget: 15000, locked: false },
  { id: 'rd', dept: 'R&D', budget: 45000, locked: true },
  { id: 'hr', dept: 'HR', budget: 12000, locked: false },
  { id: 'ops', dept: 'Operations', budget: 35000, locked: false },
];

const TARGET_BUDGET = 100000;

function SpreadsheetApp() {
  const { dispatch } = useGame();
  const [rows, setRows] = useState(INITIAL_DATA);
  const [submitted, setSubmitted] = useState(false);

  const total = rows.reduce((acc, row) => acc + row.budget, 0);
  const diff = TARGET_BUDGET - total;

  const handleBudgetChange = (id, value) => {
    const num = parseInt(value) || 0;
    setRows(rows.map(r => r.id === id ? { ...r, budget: num } : r));
  };

  const handleAction = (action) => {
    if (action === 'submit' && !submitted) {
      if (diff === 0) {
        dispatch({ type: 'UPDATE_REPUTATION', payload: 10 });
        dispatch({ type: 'UPDATE_STRESS', payload: -5 });
      } else {
        dispatch({ type: 'UPDATE_REPUTATION', payload: -15 });
        dispatch({ type: 'UPDATE_STRESS', payload: 20 });
      }
      dispatch({ type: 'ADVANCE_TIME', payload: 30 });
      setSubmitted(true);
    }
  };

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      menus: [
        { id: 'save', label: 'Save & Submit', icon: Save, action: 'submit' },
        { id: 'autosum', label: 'Auto-Sum', icon: Calculator, options: [{ label: 'Sum', action: 'sum' }, { label: 'Average', action: 'avg' }] }
      ]
    },
    {
      id: 'insert',
      label: 'Insert',
      menus: [
        { id: 'table', label: 'Table', icon: LayoutGrid },
        { id: 'chart', label: 'Chart', icon: FileText }
      ]
    },
    {
      id: 'help',
      label: 'Help',
      menus: [
        { id: 'help-btn', label: 'Get Help', icon: HelpCircle }
      ]
    }
  ];

  return (
    <div className="spreadsheet-app">
      <RibbonMenu tabs={tabs} activeColor="var(--ms-excel-green)" onAction={handleAction} />

      <div className="spreadsheet-content">
        {submitted ? (
          <div className="success-message">
            Budget submitted to the board.
          </div>
        ) : (
          <>
            <div className="instructions">
              <AlertCircle size={16} />
              <span>Adjust department budgets so the Total matches the Target Budget exactly. R&D budget is locked due to active contracts.</span>
            </div>
            <div className="excel-grid-container">
              <div className="excel-formula-bar">
                <span className="formula-label">fx</span>
                <input type="text" className="formula-input" readOnly value={diff === 0 ? "SUM(B2:B5) = Target" : `SUM(B2:B5) = ${total}`} />
              </div>
              <table className="excel-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>A</th>
                    <th>B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="header-row">
                    <td className="row-number">1</td>
                    <td className="cell"><strong>Department</strong></td>
                    <td className="cell"><strong>Allocated Budget $</strong></td>
                  </tr>
                  {rows.map((row, index) => (
                    <tr key={row.id}>
                      <td className="row-number">{index + 2}</td>
                      <td className="cell">{row.dept}</td>
                      <td className={`cell ${row.locked ? 'locked' : ''}`}>
                        {row.locked ? (
                          row.budget.toLocaleString()
                        ) : (
                          <input 
                            type="number" 
                            value={row.budget}
                            onChange={(e) => handleBudgetChange(row.id, e.target.value)}
                            className="cell-input"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td className="row-number">{rows.length + 2}</td>
                    <td className="cell"><strong>Total</strong></td>
                    <td className={`cell ${diff === 0 ? 'valid' : 'invalid'}`}>
                      <strong>{total.toLocaleString()}</strong>
                    </td>
                  </tr>
                  <tr className="target-row">
                    <td className="row-number">{rows.length + 3}</td>
                    <td className="cell">Target Budget</td>
                    <td className="cell">{TARGET_BUDGET.toLocaleString()}</td>
                  </tr>
                  <tr className="diff-row">
                    <td className="row-number">{rows.length + 4}</td>
                    <td className="cell">Difference</td>
                    <td className={`cell ${diff === 0 ? 'valid' : 'invalid'}`}>
                      {diff > 0 ? '+' : ''}{diff.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SpreadsheetApp;
