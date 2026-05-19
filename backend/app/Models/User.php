<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'email_verified_at',
        'avatar',
        'bio',
        'city',
        'country',
        'total_xp',
        'level',
        'global_rank',
        'total_co2_saved',
        'total_distance_km',
        'total_trips',
        'is_admin',
        'notifications_enabled',
        'preferred_unit',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'total_co2_saved' => 'decimal:3',
            'total_distance_km' => 'decimal:2',
            'is_admin' => 'boolean',
            'notifications_enabled' => 'boolean',
        ];
    }

    protected $appends = ['eco_level'];

    public function getEcoLevelAttribute(): string {
        return match(true) {
            $this->level >= 20 => 'Eco Master',
            $this->level >= 10 => 'Green Driver',
            $this->level >= 5  => 'Eco Learner',
            default            => 'Beginner',
        };
    }

    public function vehicles(): HasMany { return $this->hasMany(Vehicle::class); }
    public function trips(): HasMany { return $this->hasMany(Trip::class); }
    public function ecoScores(): HasMany { return $this->hasMany(EcoScore::class); }
    
    public function badges(): BelongsToMany { 
        return $this->belongsToMany(Badge::class, 'user_badges')->withPivot('awarded_at'); 
    }
    
    public function challenges(): BelongsToMany { 
        return $this->belongsToMany(Challenge::class, 'user_challenges')->withPivot('progress', 'is_completed', 'completed_at'); 
    }
}