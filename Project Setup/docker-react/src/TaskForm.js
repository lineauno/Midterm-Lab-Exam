import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const newTask = {
        title,
        description,
        status: 'pending', // Default status
        due_date: dueDate || null,
        };

        try {
        const response = await fetch('http://localhost:8000/api/tasks', {
            method: 'POST', // Add a new task
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error('Failed to add task.');
        }

        const addedTask = await response.json();
        onTaskAdded(addedTask);
        setTitle('');
        setDescription('');
        setDueDate('');
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="task-form-container">
        <h2>Add New Task</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            <textarea
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
        </div>
    );
};

export default TaskForm;