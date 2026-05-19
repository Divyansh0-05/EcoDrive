<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'nickname',
        'make',
        'model',
        'year',
        'fuel_type',
        'engine_size_cc',
        'baseline_fuel_efficiency',
        'color',
        'registration_plate',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function trips(): HasMany { return $this->hasMany(Trip::class); }

    public function scopeDefault(Builder $query): Builder {
        return $query->where('is_default', true);
    }
}