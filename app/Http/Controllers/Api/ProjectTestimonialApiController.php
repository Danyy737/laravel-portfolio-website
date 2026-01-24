<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Project;

class ProjectTestimonialApiController extends Controller
{
    public function index(Project $project)
    {
        // Use the relationship you already have: Project hasMany Testimonials
        $testimonials = $project->testimonials()
            ->latest()
            ->get();

        return TestimonialResource::collection($testimonials);
    }
}
