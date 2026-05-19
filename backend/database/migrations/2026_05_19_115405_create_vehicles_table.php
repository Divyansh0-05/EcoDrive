<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nickname', 100);
            $table->string('make', 100);
            $table->string('model', 100);
            $table->year('year');
            $table->enum('fuel_type', ['petrol','diesel','electric','hybrid','lpg']);
            $table->decimal('engine_size_cc', 6, 0)->nullable();
            $table->decimal('baseline_fuel_efficiency', 5, 2)->nullable();
            $table->string('color', 50)->nullable();
            $table->string('registration_plate', 30)->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down(): void {
        Schema::dropIfExists('vehicles');
    }
};