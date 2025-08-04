// Dashboard.js

import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import API from '../utils/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [sort, setSort] = useState('');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Optional: sort tasks before rendering
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sort === 'due') return new Date(a.dueDate) - new Date(b.dueDate);
    return 0;
  });

  return (
    <div className="dashboard">
      <h1>Group Task Binder</h1>

      {/* Sorting Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Sort:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '0.3rem' }}>
          <option value="">Default</option>
          <option value="due">Sort by Due Date</option>
        </select>
      </div>

      {/* Task form & list */}
      <TaskForm refresh={fetchTasks} />
      <TaskList tasks={sortedTasks} refresh={fetchTasks} />
    </div>
  );
};

export default Dashboard;
