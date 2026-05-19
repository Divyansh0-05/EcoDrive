<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EcoScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'year',
        'week_number',
        'avg_eco_score',
        'total_distance_km',
        'total_co2_saved_kg',
        'total_fuel_saved_liters',
        'total_trips',
        'xp_earned',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}