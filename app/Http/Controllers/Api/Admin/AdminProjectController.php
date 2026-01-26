<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class AdminProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project created successfully',
            'project' => $project,
        ], 201);
    }

    public function update(Request $request, Project $project)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
    ]);

    $project->update($validated);

    return response()->json([
        'message' => 'Project updated successfully',
        'project' => $project,
    ], 200);
}

public function destroy(\App\Models\Project $project)
{
    $project->delete();

    return response()->json([
        'message' => 'Project deleted successfully',
    ], 200);
}
}
