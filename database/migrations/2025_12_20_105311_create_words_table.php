<?php

declare(strict_types=1);

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
        Schema::create('words', function (Blueprint $table): void {
            $table->id();
            $table->string('content', 10)->unique();
            $table->string('normalized', 10);
            $table->unsignedTinyInteger('length');

            $table->index(['normalized'], 'words_normalized_index');
            $table->index(['length'], 'words_length_index');
            $table->index(['normalized', 'length'], 'words_normalized_length_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
