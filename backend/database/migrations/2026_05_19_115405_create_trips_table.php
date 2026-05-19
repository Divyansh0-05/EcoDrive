<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title', 200)->nullable();
            $table->text('notes')->nullable();
            $table->string('start_location', 255)->nullable();
            $table->string('end_location', 255)->nullable();
            $table->decimal('start_lat', 10, 7)->nullable();
            $table->decimal('start_lng', 10, 7)->nullable();
            $table->decimal('end_lat', 10, 7)->nullable();
            $table->decimal('end_lng', 10, 7)->nullable();
            $table->decimal('distance_km', 8, 2);
            $table->integer('duration_minutes');
            $table->decimal('fuel_consumed_liters', 6, 3)->nullable();
            $table->decimal('avg_speed_kmh', 5, 1)->nullable();
            $table->decimal('max_speed_kmh', 5, 1)->nullable();
            $table->integer('hard_braking_count')->default(0);
            $table->integer('hard_acceleration_count')->default(0);
            $table->integer('idle_time_seconds')->default(0);
            $table->decimal('eco_score', 4, 1)->nullable();
            $table->decimal('co2_emitted_kg', 6, 3)->nullable();
            $table->decimal('co2_saved_vs_avg_kg', 6, 3)->nullable();
            $table->integer('xp_earned')->default(0);
            $table->enum('trip_type', ['commute','leisure','work','school','other'])->default('other');
            $table->enum('weather', ['sunny','cloudy','rainy','foggy','snowy','windy'])->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['user_id', 'started_at']);
            $table->index('eco_score');
        });
    }
    public function down(): void {
        Schema::dropIfExists('trips');
    }
};