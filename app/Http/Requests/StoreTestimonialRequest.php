<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // If testimonial belongs to a project via project_id from a dropdown/hidden input:
            'project_id' => ['required', 'integer', 'exists:projects,id'],

            'author_name' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:2000'],

            // Optional rating field (only include if you have it)
            'rating' => ['nullable', 'integer', 'between:1,5'],
        ];
    }
}
