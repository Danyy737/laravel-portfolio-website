<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\ContactRequest;

class PortfolioController extends Controller
{
    public function home()
    {
        return view('home');
    }

    public function about()
    {
        return view('about');
    }

 public function projects()
{
    $projects = Project::with(['testimonials' => function ($q) {
        $q->latest()->take(2);
    }])->latest()->get();

    return view('projects', compact('projects'));
}

public function contact(ContactRequest $request)
{
    if ($request->isMethod('post')) {
        $validated = $request->validated();

        Mail::to('mouradany2004@gmail.com')
            ->send(new ContactFormMail($validated));

        return redirect()
            ->route('contact')
            ->with('success', 'Message sent successfully!');
    }

    return view('contact');
}
}