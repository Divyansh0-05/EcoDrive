<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    protected $vehicleService;

    public function __construct(VehicleService $vehicleService) {
        $this->vehicleService = $vehicleService;
    }

    public function index(Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()->vehicles]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'nickname' => 'required|string|max:100',
            'make' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'year' => 'required|integer',
            'fuel_type' => 'required|in:petrol,diesel,electric,hybrid,lpg',
            'engine_size_cc' => 'nullable|numeric',
            'baseline_fuel_efficiency' => 'nullable|numeric',
            'color' => 'nullable|string|max:50',
            'registration_plate' => 'nullable|string|max:30',
        ]);
        
        $vehicle = $this->vehicleService->create($request->user(), $data);
        return response()->json(['success' => true, 'data' => $vehicle], 201);
    }

    public function setDefault(Request $request, Vehicle $vehicle) {
        if ($vehicle->user_id !== $request->user()->id) abort(403);
        $this->vehicleService->setDefault($request->user(), $vehicle);
        return response()->json(['success' => true, 'data' => $vehicle->fresh()]);
    }

    public function destroy(Request $request, Vehicle $vehicle) {
        if ($vehicle->user_id !== $request->user()->id) abort(403);
        $vehicle->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}