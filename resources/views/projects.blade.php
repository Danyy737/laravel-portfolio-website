@extends('layouts.portfolio')

@section('content')
    <h2 class="page-title">Projects</h2>
    <p class="page-subtitle">Selected work & experiments</p>

    <div class="projects-grid">
        @forelse($projects as $project)
            <div class="project-card">
                <h3>{{ $project->title }}</h3>
                <p>{{ $project->description }}</p>

                @if($project->tech)
                    <div class="tech-stack">
                        @foreach($project->tech as $tech)
                            <span>{{ $tech }}</span>
                        @endforeach
                    </div>
                @endif

                {{-- ✅ Testimonials (independent of link) --}}
                @if($project->testimonials->count())
                    <div class="testimonials">
                        <h4 class="testimonials-title">Testimonials</h4>

                        @foreach($project->testimonials as $t)
                            <blockquote class="testimonial">
                                <p class="testimonial-quote">“{{ $t->quote }}”</p>
                                <footer class="testimonial-author">
                                    — {{ $t->author_name }}
                                    @if($t->author_role)
                                        <span>, {{ $t->author_role }}</span>
                                    @endif
                                </footer>
                            </blockquote>
                        @endforeach
                    </div>
                @endif

                {{-- Link / Coming soon --}}
                @if($project->link)
                    <a href="{{ $project->link }}" target="_blank" class="project-link">
                        View Code
                    </a>
                @else
                    <span class="coming-soon">Coming soon</span>
                @endif
            </div>
        @empty
            <p>No projects yet.</p>
        @endforelse
    </div>
@endsection
