import React, { useState } from 'react';
import API from '../utils/api';

const TaskForm = ({ refresh }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    try {
      await API.post('/tasks', { title, dueDate });
      setTitle('');
      setDueDate('');
      setError('');
      refresh();  // Refresh the task list after adding a task
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
