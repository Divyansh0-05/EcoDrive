<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->string('bio', 500)->nullable();
            $table->string('city')->nullable();
            $table->string('country', 2)->nullable()->default('IN');
            $table->integer('total_xp')->default(0);
            $table->integer('level')->default(1);
            $table->integer('global_rank')->nullable();
            $table->decimal('total_co2_saved', 10, 3)->default(0);
            $table->decimal('total_distance_km', 10, 2)->default(0);
            $table->integer('total_trips')->default(0);
            $table->boolean('is_admin')->default(false);
            $table->boolean('notifications_enabled')->default(true);
            $table->string('preferred_unit')->default('metric');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }
    public function down(): void {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};