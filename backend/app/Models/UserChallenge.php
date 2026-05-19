<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserChallenge extends Pivot
{
    protected $table = 'user_challenges';
    
    protected $fillable = [
        'user_id',
        'challenge_id',
        'progress',
        'is_completed',
        'completed_at',
        'joined_at',
    ];

    public $timestamps = false;

    protected $casts = [
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
        'joined_at' => 'datetime',
    ];
}