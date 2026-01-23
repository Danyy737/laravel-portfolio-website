<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest()->get();
        return view('admin.projects.index', compact('projects'));
    }
public function create()
{
    return view('admin.projects.create');
}
    
public function store(StoreProjectRequest $request)
{
    $validated = $request->validated();

    // If you do file uploads, handle them BEFORE create().
    // Otherwise:
    Project::create($validated);

    return redirect()->route('admin.projects.index')
        ->with('success', 'Project created successfully.');
}

public function edit(Project $project)
{
    return view('admin.projects.edit', compact('project'));
}


public function update(UpdateProjectRequest $request, Project $project)
{
    $validated = $request->validated();

    $project->update($validated);

    return redirect()->route('admin.projects.index')
        ->with('success', 'Project updated successfully.');
}

public function destroy(Project $project)
{
    $project->delete();

    return redirect()->route('admin.projects.index')
    ->with('danger', 'Project deleted.');
}
}
