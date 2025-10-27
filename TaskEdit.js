import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({ title: '', description: '', status: 'pending' });

    useEffect(() => {
        fetch(`http://localhost:8000/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => setTask(data));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
        })
        .then(() => navigate('/'))
        .catch(() => alert("Error updating task"));
    };

    return (
        <div className="container mt-4">
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={task.title}
            onChange={e => setTask({ ...task, title: e.target.value })}
            />
            <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={task.description}
            onChange={e => setTask({ ...task, description: e.target.value })}
            />
            <select
            className="form-control mb-2"
            value={task.status}
            onChange={e => setTask({ ...task, status: e.target.value })}
            >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
            <button className="btn btn-primary">Update Task</button>
        </form>
        </div>
    );
}

export default TaskEdit;
