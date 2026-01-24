<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,

            // keep these only if your Project table has them:
            'url' => $this->url ?? null,
            'github_url' => $this->github_url ?? null,
            'tech_stack' => $this->tech_stack ?? null,

            // no microseconds
            'created_at' => optional($this->created_at)?->format('Y-m-d\TH:i:s\Z'),
            'updated_at' => optional($this->updated_at)?->format('Y-m-d\TH:i:s\Z'),

            // only included when ?include=testimonials is used
            'testimonials' => TestimonialResource::collection(
                $this->whenLoaded('testimonials')
            ),
        ];
    }
}
