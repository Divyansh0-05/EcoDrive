<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Trip;
use App\Models\Badge;
use App\Services\EcoScoreService;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedBadges();
        $this->seedRealisticUsersAndTrips();
    }

    private function seedBadges()
    {
        Badge::insert([
            ['name' => 'First Trip', 'slug' => 'first-trip', 'description' => 'Log your first trip on EcoDrive.', 'category' => 'milestone', 'rarity' => 'common', 'xp_reward' => 25, 'condition_type' => 'total_trips', 'condition_value' => 1, 'is_active' => true],
            ['name' => 'Road Warrior', 'slug' => 'road-warrior', 'description' => 'Log 50 total trips.', 'category' => 'milestone', 'rarity' => 'rare', 'xp_reward' => 100, 'condition_type' => 'total_trips', 'condition_value' => 50, 'is_active' => true],
            ['name' => 'Green Starter', 'slug' => 'green-starter', 'description' => 'Maintain an average Eco Score of 70+.', 'category' => 'eco', 'rarity' => 'common', 'xp_reward' => 50, 'condition_type' => 'avg_eco_score', 'condition_value' => 70, 'is_active' => true],
            ['name' => 'Eco Champion', 'slug' => 'eco-champion', 'description' => 'Maintain an average Eco Score of 90+.', 'category' => 'eco', 'rarity' => 'epic', 'xp_reward' => 200, 'condition_type' => 'avg_eco_score', 'condition_value' => 90, 'is_active' => true],
            ['name' => 'Carbon Saver', 'slug' => 'carbon-saver', 'description' => 'Save 10kg of CO2 emissions.', 'category' => 'eco', 'rarity' => 'legendary', 'xp_reward' => 500, 'condition_type' => 'total_co2_saved', 'condition_value' => 10, 'is_active' => true],
        ]);
    }

    private function seedRealisticUsersAndTrips()
    {
        $faker = \Faker\Factory::create();
        $ecoService = new EcoScoreService();

        // Create main test user
        $mainUser = User::create([
            'name' => 'Divyansh Singh',
            'email' => 'admin@ecodrive.com',
            'password' => bcrypt('password'),
            'city' => 'Delhi',
            'level' => 12,
            'total_xp' => 6400,
        ]);
        
        $mainVehicle = Vehicle::create([
            'user_id' => $mainUser->id,
            'nickname' => 'Tesla Model 3',
            'make' => 'Tesla',
            'model' => 'Model 3',
            'year' => 2023,
            'fuel_type' => 'electric',
            'is_default' => true
        ]);

        // Create 50 random users
        for ($i = 0; $i < 50; $i++) {
            $user = User::create([
                'name' => $faker->name,
                'email' => "user{$i}@example.com",
                'password' => bcrypt('password'),
                'city' => $faker->city,
            ]);

            $vehicle = Vehicle::create([
                'user_id' => $user->id,
                'nickname' => 'Daily Commuter',
                'make' => 'Toyota',
                'model' => 'Corolla',
                'year' => 2020,
                'fuel_type' => 'petrol',
                'baseline_fuel_efficiency' => 7.0,
                'is_default' => true
            ]);

            // Generate 10-20 trips for each user over the last 30 days
            $tripCount = rand(10, 20);
            $totalDist = 0; $totalXp = 0; $totalCo2 = 0;

            for ($t = 0; $t < $tripCount; $t++) {
                $dist = rand(5, 50) + (rand(0,9)/10);
                $dur = (int)($dist * (rand(12, 20)/10)); // realistic duration
                
                $score = rand(60, 98);
                $xp = $ecoService->calculateXP($score, $dist);
                
                $trip = Trip::create([
                    'user_id' => $user->id,
                    'vehicle_id' => $vehicle->id,
                    'title' => 'Commute ' . $faker->streetName,
                    'distance_km' => $dist,
                    'duration_minutes' => $dur,
                    'avg_speed_kmh' => rand(30, 80),
                    'hard_braking_count' => rand(0, 3),
                    'hard_acceleration_count' => rand(0, 3),
                    'idle_time_seconds' => rand(10, 300),
                    'eco_score' => $score,
                    'co2_emitted_kg' => ($dist / 100 * 7.0) * 2.31,
                    'co2_saved_vs_avg_kg' => rand(0, 2) + (rand(0,9)/10),
                    'xp_earned' => $xp,
                    'trip_type' => 'commute',
                    'started_at' => Carbon::now()->subDays(rand(0, 30))->subHours(rand(0, 12)),
                ]);

                $totalDist += $dist;
                $totalXp += $xp;
                $totalCo2 += $trip->co2_saved_vs_avg_kg;
            }

            $user->update([
                'total_trips' => $tripCount,
                'total_distance_km' => $totalDist,
                'total_xp' => $totalXp,
                'total_co2_saved' => $totalCo2,
                'level' => max(1, floor($totalXp / 500)),
            ]);
        }
    }
}