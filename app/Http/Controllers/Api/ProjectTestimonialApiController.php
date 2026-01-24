<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Project;

class ProjectTestimonialApiController extends Controller
{
    public function index(Project $project)
    {
        return TestimonialResource::collection(
            $project->testimonials()->latest()->get()
        );
    }
}