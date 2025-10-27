<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::apiResource('products', \App\Http\Controllers\ProductController::class);
Route::apiResource('users', \App\Http\Controllers\UserController::class);

?>