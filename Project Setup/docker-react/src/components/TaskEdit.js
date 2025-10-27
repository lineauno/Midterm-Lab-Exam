import React, { useState, useEffect } from 'react';

const TaskEdit = ({ task, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);
    setDueDate(task.due_date || '');
  }, [task]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedTask = {
      title,
      description,
      status,
      due_date: dueDate || null,
    };

    try {
      const response = await fetch(`http://localhost:8082/api/tasks/${task.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task.');
      }

      const result = await response.json();
      onTaskUpdated(result); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-edit-container">
      <h2>Edit Task: {task.title}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <div className="action-buttons">
          <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Save Changes'}</button>
          <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;