import React from 'react';
import { useGame } from '../context/GameStateContext';
import { Landmark, ArrowUpRight, ArrowDownRight, CreditCard, ShieldCheck } from 'lucide-react';
import '../styles/BankApp.css';

function BankApp() {
  const { state } = useGame();

  // Mock transactions for now based on funds difference from initial
  const startingFunds = 100000;
  const currentFunds = state.funds;
  const diff = currentFunds - startingFunds;
  
  const transactions = [
    { id: 1, date: 'Today', desc: 'Payroll (Automated)', amount: -45000, type: 'debit' },
    { id: 2, date: 'Today', desc: 'Q3 Enterprise Licensing', amount: 85000, type: 'credit' },
    { id: 3, date: 'Yesterday', desc: 'Office Lease - Downtown', amount: -15000, type: 'debit' },
    { id: 4, date: 'Yesterday', desc: 'Server Maintenance', amount: -2500, type: 'debit' }
  ];

  if (diff < 0) {
    transactions.unshift({ id: 5, date: 'Just now', desc: 'Executive Discretionary Spend', amount: diff, type: 'debit' });
  } else if (diff > 0) {
    transactions.unshift({ id: 5, date: 'Just now', desc: 'Executive Discretionary Credit', amount: diff, type: 'credit' });
  }

  return (
    <div className="bank-app">
      <div className="bank-header">
        <div className="bank-logo">
          <Landmark size={28} />
          <span>Contoso Global Bank</span>
        </div>
        <div className="bank-secure">
           <ShieldCheck size={16} /> Secure Session
        </div>
      </div>

      <div className="bank-nav">
        <div className="bank-nav-item active">Account Summary</div>
        <div className="bank-nav-item">Transfers</div>
        <div className="bank-nav-item">Corporate Cards</div>
        <div className="bank-nav-item">Loans & Credit</div>
      </div>

      <div className="bank-content">
         <div className="bank-dashboard-grid">
           
           <div className="bank-card balance-card">
              <h3>Operating Account</h3>
              <p className="account-number">**** **** **** 8492</p>
              <div className="balance-amount">
                 ${state.funds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <p className="available-balance">Available Balance</p>
              <div className="card-actions">
                 <button className="bank-btn primary">Transfer Funds</button>
                 <button className="bank-btn">View Statements</button>
              </div>
           </div>

           <div className="bank-card quick-stats-card">
              <h3>Monthly Cash Flow</h3>
              <div className="cash-flow-stats">
                 <div className="cf-stat in">
                    <ArrowUpRight size={24} />
                    <div>
                      <div className="cf-label">Money In</div>
                      <div className="cf-val">$85,000.00</div>
                    </div>
                 </div>
                 <div className="cf-stat out">
                    <ArrowDownRight size={24} />
                    <div>
                      <div className="cf-label">Money Out</div>
                      <div className="cf-val">${(62500 - (diff < 0 ? diff : 0)).toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bank-card transactions-card">
              <h3>Recent Transactions</h3>
              <div className="transaction-list">
                {transactions.map(t => (
                  <div key={t.id} className="transaction-item">
                     <div className="txn-icon">
                       {t.type === 'credit' ? <ArrowUpRight color="green" /> : <ArrowDownRight color="red" />}
                     </div>
                     <div className="txn-details">
                       <div className="txn-desc">{t.desc}</div>
                       <div className="txn-date">{t.date}</div>
                     </div>
                     <div className={`txn-amount ${t.type}`}>
                       {t.type === 'credit' ? '+' : ''}{t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                     </div>
                  </div>
                ))}
              </div>
           </div>

         </div>
      </div>
    </div>
  );
}

export default BankApp;
