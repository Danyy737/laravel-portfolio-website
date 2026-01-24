<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'tech',
        'link',
    ];

    protected $casts = [
        'tech' => 'array',
    ];


public function testimonials()
{
    return $this->hasMany(\App\Models\Testimonial::class);
}
}

