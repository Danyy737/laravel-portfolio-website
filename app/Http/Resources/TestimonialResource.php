<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'project_id' => $this->project_id,
            'author_name' => $this->author_name,
            'author_role' => $this->author_role,
            'quote' => $this->quote,

            // no microseconds
            'created_at' => optional($this->created_at)?->format('Y-m-d\TH:i:s\Z'),
            'updated_at' => optional($this->updated_at)?->format('Y-m-d\TH:i:s\Z'),
        ];
    }
}
