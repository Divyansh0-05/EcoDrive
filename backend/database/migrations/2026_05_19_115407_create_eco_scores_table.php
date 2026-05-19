<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('eco_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('year');
            $table->integer('week_number');
            $table->decimal('avg_eco_score', 5, 2)->default(0);
            $table->decimal('total_distance_km', 8, 2)->default(0);
            $table->decimal('total_co2_saved_kg', 8, 3)->default(0);
            $table->decimal('total_fuel_saved_liters', 8, 3)->default(0);
            $table->integer('total_trips')->default(0);
            $table->integer('xp_earned')->default(0);
            $table->timestamps();
            $table->unique(['user_id', 'year', 'week_number']);
        });
    }
    public function down(): void {
        Schema::dropIfExists('eco_scores');
    }
};