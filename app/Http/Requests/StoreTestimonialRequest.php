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
        'project_id'   => ['required', 'integer', 'exists:projects,id'],
        'author_name'  => ['required', 'string', 'max:255'],
        'author_role'  => ['nullable', 'string', 'max:255'],
        'quote'        => ['required', 'string', 'max:2000'],
    ];
}
}
