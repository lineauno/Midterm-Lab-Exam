<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id(); // id - primary key [cite: 21]
            $table->string('title'); // title - string [cite: 22]
            $table->text('description')->nullable(); // description - text (nullable) [cite: 23]
            $table->enum('status', ['pending', 'in-progress', 'completed'])->default('pending'); // status - enum or string [cite: 24]
            $table->date('due_date')->nullable(); // due_date - date (nullable) [cite: 25]
            $table->timestamps(); // created_at and updated_at [cite: 26]
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
