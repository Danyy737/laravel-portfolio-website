<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
public function index()
{
    $testimonials = \App\Models\Testimonial::with('project')
        ->latest()
        ->get();

    return view('admin.testimonials.index', compact('testimonials'));
}
 public function create()
{
    $projects = \App\Models\Project::orderBy('title')->get();
    return view('admin.testimonials.create', compact('projects'));
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
            'author_name' => ['required', 'string', 'max:255'],
            'author_role' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string', 'max:1000'],
        ]);

        Testimonial::create($validated);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimonial created successfully.');
    }

public function edit(\App\Models\Testimonial $testimonial)
{
    $projects = \App\Models\Project::orderBy('title')->get();
    return view('admin.testimonials.edit', compact('testimonial', 'projects'));
}
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
            'author_name' => ['required', 'string', 'max:255'],
            'author_role' => ['nullable', 'string', 'max:255'],
            'quote' => ['required', 'string', 'max:1000'],
        ]);

        $testimonial->update($validated);

        return redirect()
            ->route('admin.testimonials.index')
            ->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()
            ->route('admin.testimonials.index')
            ->with('danger', 'Testimonial deleted.');
    }
}
