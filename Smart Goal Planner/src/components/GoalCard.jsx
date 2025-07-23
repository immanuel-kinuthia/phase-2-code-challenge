import React from 'react';

function GoalCard({ goal, onEdit, onDelete }) {
  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const isOverdue = daysLeft < 0 && goal.savedAmount < goal.targetAmount;
  const isNearDeadline = daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  const isCompleted = goal.savedAmount >= goal.targetAmount;

  return (
    <div className={`goal-card ${isOverdue ? 'goal-card-overdue' : isNearDeadline ? 'goal-card-near-deadline' : isCompleted ? 'goal-card-completed' : ''}`}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Target: ${goal.targetAmount.toLocaleString()}</p>
      <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
      <p>Remaining: ${(goal.targetAmount - goal.savedAmount).toLocaleString()}</p>
      <p>Deadline: {goal.deadline}</p>
      <p>Days Left: {daysLeft < 0 ? 'Overdue' : daysLeft}</p>
      {isOverdue && <p className="status-overdue">Overdue!</p>}
      {isNearDeadline && <p className="status-near-deadline">Deadline approaching!</p>}
      {isCompleted && <p className="status-completed">Completed!</p>}
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="button-group">
        <button onClick={onEdit} className="button button-yellow">Edit</button>
        <button onClick={onDelete} className="button button-red">Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;