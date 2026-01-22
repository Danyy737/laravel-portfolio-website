@extends('layouts.portfolio')

@section('content')
<div class="hero">
    <div class="hero-content">
        <h1>Hi, I’m Daniel Mourad</h1>
        <h2>Aspiring Web Developer | Laravel Enthusiast</h2>
        <p>Welcome to my portfolio. Explore my projects, skills, and experience.</p>
        <a href="/projects" class="btn-hero">View My Work</a>
        <a href="{{ route('contact') }}" class="btn btn-secondary">
        Contact Me
    </a>
</div>
    </div>
</div>
@endsection
