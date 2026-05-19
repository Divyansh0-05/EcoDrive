<?php

namespace App\Services;

class EcoScoreService
{
    public function calculate(array $tripData): float
    {
        $speedScore       = $this->calcSpeedScore($tripData['avg_speed_kmh'] ?? 0);
        $consistencyScore = $this->calcConsistencyScore($tripData['hard_braking_count'] ?? 0, $tripData['hard_acceleration_count'] ?? 0);
        $idleScore        = $this->calcIdleScore($tripData['idle_time_seconds'] ?? 0, $tripData['duration_minutes'] ?? 0);
        $fuelScore        = $this->calcFuelScore($tripData);
        $distanceBonus    = min(10, ($tripData['distance_km'] ?? 0) / 5);

        $score = ($speedScore * 0.20) + ($consistencyScore * 0.25) + ($idleScore * 0.20) + ($fuelScore * 0.25) + ($distanceBonus * 0.10);
        return min(100, max(0, round($score, 1)));
    }

    private function calcSpeedScore(float $avgSpeed): float {
        if ($avgSpeed >= 40 && $avgSpeed <= 80) return 100;
        if ($avgSpeed < 40) return max(0, 100 - ((40 - $avgSpeed) * 2));
        return max(0, 100 - (($avgSpeed - 80) * 2));
    }

    private function calcConsistencyScore(int $hardBraking, int $hardAcc): float {
        return max(0, 100 - (($hardBraking + $hardAcc) * 8));
    }

    private function calcIdleScore(int $idleSecs, int $durationMins): float {
        $durationSecs = max(1, $durationMins * 60);
        return max(0, 100 - (($idleSecs / $durationSecs * 100) * 1.5));
    }

    private function calcFuelScore(array $tripData): float {
        if (!isset($tripData['fuel_consumed_liters']) || !$tripData['fuel_consumed_liters']) return 70;
        // In a real app, compare with vehicle baseline.
        return 80; 
    }

    public function estimateCO2(float $fuelLiters, string $fuelType): float {
        return match($fuelType) {
            'petrol' => $fuelLiters * 2.31,
            'diesel' => $fuelLiters * 2.68,
            'hybrid' => $fuelLiters * 1.5,
            'lpg' => $fuelLiters * 1.61,
            'electric' => 0,
            default => $fuelLiters * 2.31,
        };
    }

    public function calculateXP(float $ecoScore, float $distanceKm): int {
        return (int) min(100, 10 + ($ecoScore / 100 * 20) + ($distanceKm * 0.5));
    }
}