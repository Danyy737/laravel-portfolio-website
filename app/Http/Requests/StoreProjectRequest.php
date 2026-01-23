<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Routes are already behind your admin middleware.
        // Keep true so this request never blocks unexpectedly.
        return true;
    }

    public function rules(): array
    {
        return [
            // Adjust field names to match your form + DB columns
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],

            // Common optional fields (remove if you don’t use them)
            'url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'tech_stack' => ['nullable', 'string', 'max:255'],

            // If you upload an image file for a project:
            // 'image' => ['nullable', 'image', 'max:2048'],
        ];
    }
}
