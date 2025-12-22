<?php

declare(strict_types=1);

use App\Models\Game;
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
        Schema::table('games', function (Blueprint $table) {
            $table->unsignedTinyInteger('round')->default(1)->change();
        });

        Game::increment('round');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->unsignedTinyInteger('round')->default(0)->change();
        });

        Game::where('round', '>', 0)->decrement('round');

    }
};
