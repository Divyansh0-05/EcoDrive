<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\EcoScoreService;

class EcoScoreServiceTest extends TestCase
{
    private EcoScoreService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new EcoScoreService();
    }

    public function test_calculate_optimal_eco_score(): void
    {
        $tripData = [
            'avg_speed_kmh' => 60,
            'hard_braking_count' => 0,
            'hard_acceleration_count' => 0,
            'idle_time_seconds' => 0,
            'duration_minutes' => 10,
            'distance_km' => 10,
        ];

        $score = $this->service->calculate($tripData);
        // optimal: speed=100, consistency=100, idle=100, fuel=70, distanceBonus=2
        // calculation: (100*0.2) + (100*0.25) + (100*0.2) + (70*0.25) + (2*0.1) = 20 + 25 + 20 + 17.5 + 0.2 = 82.7
        $this->assertEquals(82.7, $score);
    }

    public function test_estimate_co2_emission(): void
    {
        $this->assertEquals(2.31 * 10, $this->service->estimateCO2(10, 'petrol'));
        $this->assertEquals(2.68 * 10, $this->service->estimateCO2(10, 'diesel'));
        $this->assertEquals(0, $this->service->estimateCO2(10, 'electric'));
    }

    public function test_calculate_xp_progression(): void
    {
        // score 80, distance 10km -> 10 + (80/100*20) + (10*0.5) = 10 + 16 + 5 = 31
        $this->assertEquals(31, $this->service->calculateXP(80, 10));
    }
}
