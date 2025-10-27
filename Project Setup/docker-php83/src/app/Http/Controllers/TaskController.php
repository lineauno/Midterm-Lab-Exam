<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all(); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task = Task::create($request->all()); 
        return response()->json($task, 201); 
    }

    public function show($id)
    {
        return Task::findOrFail($id); 
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:pending,in-progress,completed',
            'due_date' => 'nullable|date',
        ]);

        $task->update($request->all()); 
        return response()->json($task, 200);
    }


    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete(); 
        return response()->json(null, 204); 
    }
}