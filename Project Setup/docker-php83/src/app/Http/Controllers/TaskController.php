<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Fetch all tasks [cite: 35]
     */
    public function index()
    {
        return Task::all(); // GET /api/tasks [cite: 35]
    }

    /**
     * Create a new task [cite: 35]
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create($request->all()); // POST /api/tasks [cite: 35]
        return response()->json($task, 201); // 201 Created
    }

    /**
     * Get a specific task [cite: 35]
     */
    public function show($id)
    {
        return Task::findOrFail($id); // GET /api/tasks/{id} [cite: 35]
    }

    /**
     * Update a specific task [cite: 35]
     */
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task->update($request->all()); // PUT /api/tasks/{id} [cite: 35]
        return response()->json($task, 200);
    }

    /**
     * Delete a specific task [cite: 36]
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete(); // DELETE /api/tasks/{id} [cite: 36]
        return response()->json(null, 204); // 204 No Content
    }
}