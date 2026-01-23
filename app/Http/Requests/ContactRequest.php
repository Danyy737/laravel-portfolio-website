<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Public form: anyone can submit (throttle handles abuse)
        return true;
    }

public function rules(): array
{
    // Only validate when submitting the form
    if (!$this->isMethod('post')) {
        return [];
    }

    return [
        'name'    => ['required', 'string', 'max:255'],
        'email'   => ['required', 'email'],
        'message' => ['required', 'string'],
    ];
}
}
