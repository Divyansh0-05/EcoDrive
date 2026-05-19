<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    public function index() {
        return response()->json(['success' => true, 'data' => Badge::where('is_active', true)->get()]);
    }

    public function mine(Request $request) {
        $badges = $request->user()->badges;
        return response()->json(['success' => true, 'data' => $badges]);
    }
}