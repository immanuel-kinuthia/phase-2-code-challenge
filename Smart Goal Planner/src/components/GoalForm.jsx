import React, { useState, useEffect } from 'react';

function GoalForm({ onSubmit, editingGoal, setEditingGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: 'Travel',
    deadline: ''
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name,
        targetAmount: editingGoal.targetAmount,
        category: editingGoal.category,
        deadline: editingGoal.deadline
      });
    }
  }, [editingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editingGoal ? editingGoal.id : null, {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      category: formData.category,
      deadline: formData.deadline
    });
    setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card">
      <h2 className="card-title">{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Target Amount ($)</label>
          <input 
            type="number" 
            name="targetAmount" 
            value={formData.targetAmount} 
            onChange={handleChange} 
            required 
            min="1" 
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
          >
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input 
            type="date" 
            name="deadline" 
            value={formData.deadline} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="button-group">
          <button type="submit" className="button button-blue">
            {editingGoal ? 'Update Goal' : 'Add Goal'}
          </button>
          {editingGoal && (
            <button 
              type="button" 
              className="button button-red" 
              onClick={() => {
                setEditingGoal(null);
                setFormData({ name: '', targetAmount: '', category: 'Travel', deadline: '' });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GoalForm;