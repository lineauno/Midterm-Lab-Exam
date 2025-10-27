<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * title, description, status, due_date [cite: 32]
     */
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'due_date' => 'date',
    ];
}
