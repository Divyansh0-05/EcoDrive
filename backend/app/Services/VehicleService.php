<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Models\User;

class VehicleService
{
    public function create(User $user, array $data): Vehicle
    {
        if ($user->vehicles()->count() === 0) {
            $data['is_default'] = true;
        }
        return $user->vehicles()->create($data);
    }

    public function update(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);
        return $vehicle;
    }

    public function setDefault(User $user, Vehicle $vehicle): void
    {
        $user->vehicles()->update(['is_default' => false]);
        $vehicle->update(['is_default' => true]);
    }
}