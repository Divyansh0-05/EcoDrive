<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->string('slug', 100)->unique();
            $table->text('description');
            $table->string('icon_emoji', 10)->default('🏅');
            $table->string('icon_url')->nullable();
            $table->enum('category', ['milestone','eco','speed','streak','community','special']);
            $table->enum('rarity', ['common','rare','epic','legendary'])->default('common');
            $table->integer('xp_reward')->default(50);
            $table->string('condition_type', 100);
            $table->decimal('condition_value', 10, 2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('badges');
    }
};