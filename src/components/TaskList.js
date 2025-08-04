import React, { useState } from 'react';
import API from '../utils/api';
import API from '../utils/api'; // or wherever your API helper is
import './TaskList.css';

export default TaskList;
const TaskList = ({ tasks, refresh }) => {
    const TaskList = ({ tasks, refresh }) => {
  const [editing, setEditing] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const startEdit = (task) => {
    setEditing(task._id);
    setNewTitle(task.title);
  };

  const saveEdit = async (id) => {
    if (!newTitle.trim()) return;
    try {
      await API.put(`/tasks/${id}`, { title: newTitle });
      setEditing(null);
      refresh();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      refresh();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const toggleCompletion = async (id, current) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !current });
      refresh();
    } catch (err) {
      console.error('Error toggling completion:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <>
      <h2>Group Task Binder</h2>

      {/* Filter Control */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>Filter Tasks:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter} style={{ padding: '0.3rem' }}>
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <ul>
  {filteredTasks.map((task) => {
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

    return (
      <li key={task._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', textDecoration: task.completed ? 'line-through' : 'none' }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompletion(task._id, task.completed)}
          className="task-checkbox"
        />

        {editing === task._id ? (
          <>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ flex: '1', padding: '0.3rem' }}
            />
            <button
              onClick={() => saveEdit(task._id)}
              className="btn btn-save"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span style={{ flex: '1' }}>{task.title}</span>
            {task.dueDate && (
              <span className={`badge ${isOverdue ? 'badge-overdue' : ''}`}>
                Due {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <button
              onClick={() => startEdit(task)}
              className="btn btn-edit"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="btn btn-delete"
            >
              Delete
            </button>
            {editingId === task._id ? (
  <>
    <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
    <button type="button" onClick={saveEdit}>Save</button>
    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
  </>
) : (
  <>
    <span>{task.title}</span>
    <button onClick={() => startEdit(task)}>Edit</button>
  </>
)}

          </>
        )}
      </li>
    );
  })}
</ul>
    </>
  );
};
}
