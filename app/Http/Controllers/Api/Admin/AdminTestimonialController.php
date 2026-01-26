<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class AdminTestimonialController extends Controller
{
public function store(Request $request, \App\Models\Project $project)
{
    $validated = $request->validate([
        'author_name' => ['required', 'string', 'max:255'],
        'author_role' => ['nullable', 'string', 'max:255'],
        'quote' => ['required', 'string'],
    ]);

    $testimonial = $project->testimonials()->create($validated);

    return response()->json([
        'message' => 'Testimonial created successfully',
        'testimonial' => $testimonial,
    ], 201);
}

    public function update(Request $request, \App\Models\Testimonial $testimonial)
{
    $validated = $request->validate([
        'author_name' => ['sometimes', 'required', 'string', 'max:255'],
        'author_role' => ['sometimes', 'nullable', 'string', 'max:255'],
        'quote' => ['sometimes', 'required', 'string'],
    ]);

    if (empty($validated)) {
        return response()->json([
            'message' => 'Nothing to update. Send author_name/author_role/quote.',
        ], 422);
    }

    $testimonial->update($validated);

    return response()->json([
        'message' => 'Testimonial updated successfully',
        'testimonial' => $testimonial,
    ], 200);
}

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully',
        ], 200);
    }
}
