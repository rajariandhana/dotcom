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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name')->nullable();
            $table->string('slug')->unique();
            $table->string('techs')->nullable();
            $table->text('desc')->nullable();
            $table->unsignedTinyInteger('numPhoto')->default(0);
            $table->string('extension',10)->default('jpg');
            $table->string('repo')->nullable();
            $table->string('demo')->nullable();
            $table->string('size')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
