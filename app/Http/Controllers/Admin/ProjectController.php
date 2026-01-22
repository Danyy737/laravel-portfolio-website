<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;   // ✅ ADD THIS LINE

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
    
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'tech' => ['nullable', 'string'],   // we will turn this into an array
        'link' => ['nullable', 'url', 'max:255'],
    ]);

    $techArray = collect(explode(',', $validated['tech'] ?? ''))
        ->map(fn ($t) => trim($t))
        ->filter()
        ->values()
        ->all();

    Project::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'tech' => $techArray,
        'link' => $validated['link'] ?? null,
    ]);

    return redirect()->route('admin.projects.index')->with('success', 'Project created!');
}

public function edit(Project $project)
{
    return view('admin.projects.edit', compact('project'));
}

public function update(Request $request, Project $project)
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'tech' => ['nullable', 'string'],
        'link' => ['nullable', 'url', 'max:255'],
    ]);

    $techArray = collect(explode(',', $validated['tech'] ?? ''))
        ->map(fn ($t) => trim($t))
        ->filter()
        ->values()
        ->all();

    $project->update([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'tech' => $techArray,
        'link' => $validated['link'] ?? null,
    ]);

    return redirect()->route('admin.projects.index')->with('success', 'Project updated!');
}

public function destroy(Project $project)
{
    $project->delete();

    return redirect()->route('admin.projects.index')
    ->with('danger', 'Project deleted.');
}
}
