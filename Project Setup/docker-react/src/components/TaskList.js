import React from 'react';

const TaskList = ({ tasks, onDelete, onEditClick, onMarkCompleted }) => {
  return (
    <div className="task-list-container">
      <h2>Task List ({tasks.length} tasks)</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item task-status-${task.status}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: <strong>{task.status}</strong></p>
            <p>Due Date: {task.due_date || 'N/A'}</p>
            <div className="task-actions">
              <button onClick={() => onEditClick(task)}>Edit</button> {}
              <button onClick={() => onDelete(task.id)}>Delete</button> {}
              {task.status !== 'completed' && (
                <button onClick={() => onMarkCompleted(task.id)}>
                  Mark as Completed
                </button> 
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;