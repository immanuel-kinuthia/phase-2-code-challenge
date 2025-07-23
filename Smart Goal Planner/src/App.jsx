import React, { useState, useEffect } from 'react';
import Overview from './components/Overview.jsx';
import GoalForm from './components/GoalForm.jsx';
import DepositForm from './components/DepositForm.jsx';
import GoalCard from './components/GoalCard.jsx';

const API_URL = 'https://phase-2-code-challenge-jyi6.onrender.com/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    const response = await fetch(API_URL);
    const data = await response.json();
    setGoals(data);
  }

  async function handleAddGoal(goal) {
    const newGoal = {
      id: Date.now().toString(),
      ...goal,
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal)
    });

    fetchGoals();
  }

  async function handleUpdateGoal(id, updatedGoal) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoal)
    });

    setEditingGoal(null);
    fetchGoals();
  }

  async function handleDeposit(goalId, amount) {
    const response = await fetch(`${API_URL}/${goalId}`);
    const goal = await response.json();
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };

    await fetch(`${API_URL}/${goalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedAmount: updatedGoal.savedAmount })
    });

    fetchGoals();
  }

  async function handleDeleteGoal(id) {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchGoals();
    }
  }

  return (
    <div className="container">
      <h1 className="title">Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm 
        onSubmit={editingGoal ? handleUpdateGoal : handleAddGoal} 
        editingGoal={editingGoal} 
        setEditingGoal={setEditingGoal}
      />
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <div className="card">
        <h2 className="card-title">Your Goals</h2>
        <div className="goals-list">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onEdit={() => setEditingGoal(goal)} 
              onDelete={() => handleDeleteGoal(goal.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;