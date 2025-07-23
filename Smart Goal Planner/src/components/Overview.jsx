import React from 'react';

function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  return (
    <div className="card">
      <h2 className="card-title">Overview</h2>
      <div className="overview-grid">
        <div className="overview-item overview-item-blue">
          <p>Total Goals</p>
          <p>{totalGoals}</p>
        </div>
        <div className="overview-item overview-item-green">
          <p>Total Saved</p>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="overview-item overview-item-purple">
          <p>Goals Completed</p>
          <p>{completedGoals}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;