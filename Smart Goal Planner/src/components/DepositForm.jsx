import React, { useState } from 'react';

function DepositForm({ goals, onDeposit }) {
  const [depositData, setDepositData] = useState({
    goalId: '',
    amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (depositData.goalId && depositData.amount) {
      onDeposit(depositData.goalId, parseFloat(depositData.amount));
      setDepositData({ goalId: '', amount: '' });
    }
  };

  const handleChange = (e) => {
    setDepositData({ ...depositData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h2 className="card-title">Make a Deposit</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Select Goal</label>
          <select 
            name="goalId" 
            value={depositData.goalId} 
            onChange={handleChange} 
            required
          >
            <option value="">Select a goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Deposit Amount ($)</label>
          <input 
            type="number" 
            name="amount" 
            value={depositData.amount} 
            onChange={handleChange} 
            required 
            min="1" 
          />
        </div>
        <button type="submit" className="button button-green">Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;