<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LeaderboardController extends Controller
{
    public function global(Request $request) {
        $users = Cache::remember('leaderboard_global', 300, function() {
            return User::select('id','name','avatar','level','total_xp','total_co2_saved','total_trips')
                ->orderBy('total_xp', 'desc')
                ->limit(100)
                ->get()
                ->map(function($user, $idx) {
                    $user->rank = $idx + 1;
                    $user->eco_level = $user->eco_level;
                    return $user;
                });
        });

        // Pagination wrapper for simplicity
        return response()->json(['success' => true, 'data' => $users]);
    }

    public function weekly(Request $request) {
        return response()->json(['success' => true, 'data' => []]); // Placeholder
    }
}