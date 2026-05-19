<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar_url' => $this->avatar ? url('storage/' . $this->avatar) : null,
            'bio' => $this->bio,
            'city' => $this->city,
            'country' => $this->country,
            'level' => $this->level,
            'eco_level' => $this->eco_level,
            'total_xp' => $this->total_xp,
            'total_trips' => $this->total_trips,
            'total_distance_km' => $this->total_distance_km,
            'total_co2_saved' => $this->total_co2_saved,
            'global_rank' => $this->global_rank,
            'badges_count' => $this->badges_count ?? 0,
            'is_admin' => $this->is_admin,
            'created_at' => $this->created_at,
        ];
    }
}