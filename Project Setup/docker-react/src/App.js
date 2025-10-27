import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const API_URL = 'http://localhost:8000/api/tasks'; 

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError("Failed to delete task: " + err.message);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setIsEditing(false);
    setCurrentTask(null);
  };

  const handleMarkCompleted = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }), 
      });

      if (!response.ok) {
        throw new Error('Failed to mark task as completed.');
      }

      const completedTask = await response.json();
      handleTaskUpdated(completedTask);
    } catch (err) {
      setError("Failed to complete task: " + err.message);
    }
  };


  if (loading) return <div className="loading">Loading tasks... </div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <hr />
      {isEditing ? (
        <TaskEdit
          task={currentTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TaskForm onTaskAdded={handleTaskAdded} />
      )}
      <hr />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        onMarkCompleted={handleMarkCompleted}
      />
    </div>
  );
}

export default App;