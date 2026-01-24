<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectApiController extends Controller
{
    public function index(Request $request)
    {
        // Paginate so you don’t dump everything if you add lots of projects later.
        $projects = Project::query()
            ->latest()
            ->paginate(10);

        return ProjectResource::collection($projects);
    }

    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
}
