<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;

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
public function store(StoreTestimonialRequest $request)
{
    $validated = $request->validated();

    Testimonial::create($validated);

    return redirect()->route('admin.testimonials.index')
        ->with('success', 'Testimonial created successfully.');
}
public function edit(\App\Models\Testimonial $testimonial)
{
    $projects = \App\Models\Project::orderBy('title')->get();
    return view('admin.testimonials.edit', compact('testimonial', 'projects'));
}

public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
{
    $validated = $request->validated();

    $testimonial->update($validated);

    return redirect()->route('admin.testimonials.index')
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
