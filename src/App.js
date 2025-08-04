import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [user, setUser] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !user) return alert('Please enter both name and task title');

    const newTask = { title, dueDate, dueTime, user, completed: false };
    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = newTask;
      setTasks(updated);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTitle('');
    setDueDate('');
    setDueTime('');
    setUser('');
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const startEdit = (index) => {
    const task = tasks[index];
    setUser(task.user);
    setTitle(task.title);
    setDueDate(task.dueDate);
    setDueTime(task.dueTime);
    setEditingIndex(index);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="container">
      <h2>Group Task Binder</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Your name..."
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <button type="submit">{editingIndex !== null ? 'Save Task' : 'Add Task'}</button>
      </form>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <span>
              {task.title} — by {task.user}
              {task.dueDate && ` (Due: ${task.dueDate}${task.dueTime ? ` at ${task.dueTime}` : ''})`}
            </span>
            <button onClick={() => startEdit(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
