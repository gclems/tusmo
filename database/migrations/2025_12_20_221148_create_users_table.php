<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('email', 255)->unique();
            $table->string('password', 255);
            $table->string('username', 100)->unique();

            $table->unsignedInteger('games_count')->default(0);
            $table->unsignedInteger('wins_count')->default(0);
            $table->unsignedInteger('current_streak')->default(0);
            $table->unsignedInteger('max_streak')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
