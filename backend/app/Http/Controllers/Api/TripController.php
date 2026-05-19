<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use App\Services\EcoScoreService;
use Illuminate\Http\Request;

class TripController extends Controller
{
    protected $ecoScoreService;

    public function __construct(EcoScoreService $ecoScoreService) {
        $this->ecoScoreService = $ecoScoreService;
    }

    public function index(Request $request)
    {
        $trips = $request->user()->trips()->with('vehicle')->orderBy('started_at', 'desc')->paginate(15);
        return response()->json(['success' => true, 'data' => $trips]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'title' => 'nullable|string|max:200',
            'distance_km' => 'required|numeric',
            'duration_minutes' => 'required|integer',
            'fuel_consumed_liters' => 'nullable|numeric',
            'avg_speed_kmh' => 'nullable|numeric',
            'hard_braking_count' => 'integer',
            'hard_acceleration_count' => 'integer',
            'idle_time_seconds' => 'integer',
            'trip_type' => 'string',
            'started_at' => 'date',
        ]);

        $score = $this->ecoScoreService->calculate($data);
        $co2 = isset($data['fuel_consumed_liters']) ? $this->ecoScoreService->estimateCO2($data['fuel_consumed_liters'], 'petrol') : 0;
        $xp = $this->ecoScoreService->calculateXP($score, $data['distance_km']);
        $co2Saved = max(0, ($data['distance_km'] * 0.22) - $co2);

        $data['eco_score'] = $score;
        $data['co2_emitted_kg'] = $co2;
        $data['co2_saved_vs_avg_kg'] = $co2Saved;
        $data['xp_earned'] = $xp;
        
        $trip = $request->user()->trips()->create($data);

        // Update user stats
        $user = $request->user();
        $user->increment('total_trips');
        $user->increment('total_distance_km', $data['distance_km']);
        $user->increment('total_xp', $xp);
        $user->increment('total_co2_saved', $co2Saved);

        // Badge Checking Logic
        $activeBadges = \App\Models\Badge::where('is_active', true)->get();
        $unlockedBadges = $user->badges()->pluck('badges.id')->toArray();

        foreach ($activeBadges as $badge) {
            if (in_array($badge->id, $unlockedBadges)) {
                continue;
            }

            $shouldUnlock = false;

            switch ($badge->condition_type) {
                case 'total_trips':
                    if ($user->total_trips >= $badge->condition_value) {
                        $shouldUnlock = true;
                    }
                    break;
                case 'total_co2_saved':
                    if ($user->total_co2_saved >= $badge->condition_value) {
                        $shouldUnlock = true;
                    }
                    break;
                case 'avg_eco_score':
                    $avgScore = $user->trips()->avg('eco_score');
                    if ($avgScore >= $badge->condition_value) {
                        $shouldUnlock = true;
                    }
                    break;
            }

            if ($shouldUnlock) {
                $user->badges()->attach($badge->id, ['awarded_at' => now()]);
                $user->increment('total_xp', $badge->xp_reward);
                
                $user->notifications()->create([
                    'title' => 'New Badge Unlocked!',
                    'message' => "Congratulations! You've earned the '{$badge->name}' badge.",
                    'type' => 'achievement',
                ]);
            }
        }
        
        // Recalculate level
        $newLevel = max(1, floor($user->total_xp / 500));
        if ($newLevel != $user->level) {
            $user->update(['level' => $newLevel]);
            $user->notifications()->create([
                'title' => 'Level Up!',
                'message' => "You have reached Level {$newLevel}!",
                'type' => 'level_up',
            ]);
        }

        return response()->json(['success' => true, 'data' => $trip], 201);
    }
    
    public function recent(Request $request)
    {
        $trips = $request->user()->trips()->with('vehicle')->orderBy('started_at', 'desc')->limit(5)->get();
        return response()->json(['success' => true, 'data' => $trips]);
    }
}