<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $user = $request->user()->load('vehicles');
        $recentTrips = $user->trips()->with('vehicle')->orderBy('started_at', 'desc')->limit(5)->get();
        $badges = $user->badges()->orderBy('pivot_awarded_at', 'desc')->limit(3)->get();
        
        // Generate mock weekly chart data
        $weeklyChart = collect(range(6, 0))->map(function($daysAgo) use ($user) {
            $date = Carbon::now()->subDays($daysAgo)->format('M d');
            // Mock score based on user level to make it look realistic
            $baseScore = min(98, 60 + ($user->level * 2));
            return [
                'name' => $date,
                'score' => rand($baseScore - 10, $baseScore + 5)
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'name' => $user->name,
                    'level' => $user->level,
                    'total_xp' => $user->total_xp,
                    'total_trips' => $user->total_trips,
                    'total_distance_km' => $user->total_distance_km,
                    'total_co2_saved' => $user->total_co2_saved,
                ],
                'recentTrips' => $recentTrips,
                'weeklyChart' => $weeklyChart,
                'recentBadges' => $badges,
            ]
        ]);
    }
}