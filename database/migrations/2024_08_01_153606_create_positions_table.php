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
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            // $table->string('slug');
            $table->foreignId('employer_id')->references('id')->on('employers')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->text('skills')->nullable();
            $table->string('date')->nullable();
            $table->boolean('currentlyWorking',false)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
