<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

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

    public function contact(Request $request)
    {
        if ($request->isMethod('post')) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'message' => 'required|string',
            ]);

            Mail::to('mouradany2004@gmail.com')
                ->send(new ContactFormMail($validated));

            return redirect()
                ->route('contact')
                ->with('success', 'Your message has been sent!');
        }

        return view('contact');
    }
}
