<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'emoji',
        'type',
        'goal_metric',
        'goal_value',
        'xp_reward',
        'badge_id',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function badge(): BelongsTo { return $this->belongsTo(Badge::class); }

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'user_challenges');
    }

    public function scopeActive(Builder $query): Builder {
        return $query->where('is_active', true)->where('ends_at', '>', Carbon::now());
    }
}