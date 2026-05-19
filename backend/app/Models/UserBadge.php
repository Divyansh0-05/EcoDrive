<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserBadge extends Pivot
{
    protected $table = 'user_badges';
    
    protected $fillable = [
        'user_id',
        'badge_id',
        'awarded_at',
    ];

    public $timestamps = false;
    
    protected $casts = [
        'awarded_at' => 'datetime',
    ];
}