<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'author_name',
        'author_role',
        'quote',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
