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
    $perPage = (int) $request->query('per_page', 10);
    $perPage = max(1, min($perPage, 50)); // clamp between 1 and 50

    $projects = Project::query()
        ->latest()
        ->paginate($perPage);

    return ProjectResource::collection($projects);
}

    public function show(Project $project)
    {
        return new ProjectResource($project);
    }
}
