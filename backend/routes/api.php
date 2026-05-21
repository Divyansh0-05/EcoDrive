<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::prefix('v1')->group(function () {
    // Public Auth Routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

    // Protected Auth Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::get('/auth/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
        Route::post('/auth/resend-verification', [AuthController::class, 'resendVerification']);
        
        // Stubs for future routes
        // Route::apiResource('vehicles', VehicleController::class);
        // Route::apiResource('trips', TripController::class);
        Route::get('/dashboard', [\App\Http\Controllers\Api\DashboardController::class, 'index']);
        
        Route::post('/ai/chat', [\App\Http\Controllers\AIAssistantController::class, 'chat']);
        
        Route::get('/vehicles', [\App\Http\Controllers\Api\VehicleController::class, 'index']);
        Route::post('/vehicles', [\App\Http\Controllers\Api\VehicleController::class, 'store']);
        Route::patch('/vehicles/{vehicle}/set-default', [\App\Http\Controllers\Api\VehicleController::class, 'setDefault']);
        Route::delete('/vehicles/{vehicle}', [\App\Http\Controllers\Api\VehicleController::class, 'destroy']);
        
        Route::get('/trips', [\App\Http\Controllers\Api\TripController::class, 'index']);
        Route::post('/trips', [\App\Http\Controllers\Api\TripController::class, 'store']);
        Route::get('/trips/recent', [\App\Http\Controllers\Api\TripController::class, 'recent']);
        
        Route::get('/leaderboard', [\App\Http\Controllers\Api\LeaderboardController::class, 'global']);
        Route::get('/badges', [\App\Http\Controllers\Api\BadgeController::class, 'index']);
        Route::get('/badges/mine', [\App\Http\Controllers\Api\BadgeController::class, 'mine']);
    });
});