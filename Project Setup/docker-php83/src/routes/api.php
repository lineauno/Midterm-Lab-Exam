<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController; 

Route::apiResource('tasks', TaskController::class); [cite: 37]
Route::apiResource('tasks', TaskController::class);

Route::put('tasks/{id}/complete', [TaskController::class, 'markAsCompleted']);