import React, { useEffect, useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/api/tasks")
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => setError("Failed to fetch tasks"))
        .finally(() => setLoading(false));
    }, []);

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
        fetch(`http://localhost:8000/api/tasks/${id}`, { method: 'DELETE' })
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(() => alert("Error deleting task"));
        }
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
        <h2>Task List</h2>
        <ul className="list-group">
            {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{task.title}</span>
                <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => window.location = `/edit/${task.id}`}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default TaskList;
