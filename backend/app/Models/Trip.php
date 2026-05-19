<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Trip extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'title',
        'notes',
        'start_location',
        'end_location',
        'start_lat',
        'start_lng',
        'end_lat',
        'end_lng',
        'distance_km',
        'duration_minutes',
        'fuel_consumed_liters',
        'avg_speed_kmh',
        'max_speed_kmh',
        'hard_braking_count',
        'hard_acceleration_count',
        'idle_time_seconds',
        'eco_score',
        'co2_emitted_kg',
        'co2_saved_vs_avg_kg',
        'xp_earned',
        'trip_type',
        'weather',
        'started_at',
        'ended_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'eco_score' => 'decimal:1',
    ];

    protected $appends = ['duration_formatted'];

    public function getDurationFormattedAttribute(): string {
        $hours = floor($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        if ($hours > 0) return "{$hours}h {$minutes}m";
        return "{$minutes}m";
    }

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function vehicle(): BelongsTo { return $this->belongsTo(Vehicle::class); }

    public function scopeForUser(Builder $query, $userId): Builder {
        return $query->where('user_id', $userId);
    }

    public function scopeThisWeek(Builder $query): Builder {
        return $query->where('started_at', '>=', Carbon::now()->startOfWeek());
    }

    public function scopeThisMonth(Builder $query): Builder {
        return $query->where('started_at', '>=', Carbon::now()->startOfMonth());
    }
}