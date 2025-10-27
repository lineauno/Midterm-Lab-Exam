<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use Illuminate\Support\Carbon;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $statuses = ['pending', 'in-progress', 'completed'];
        $tasks = [];

        // Populate at least 20 sample tasks [cite: 29]
        for ($i = 1; $i <= 20; $i++) {
            $tasks[] = [
                'title' => "Task Number $i",
                'description' => "This is a sample description for Task $i.",
                'status' => $statuses[array_rand($statuses)],
                'due_date' => Carbon::now()->addDays(rand(1, 30))->format('Y-m-d'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        Task::insert($tasks);
    }
}
