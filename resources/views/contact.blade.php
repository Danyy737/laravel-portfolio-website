@extends('layouts.portfolio')

@section('content')
<h2 class="page-title">Contact</h2>
<p class="page-subtitle">Feel free to reach out — I’ll reply as soon as I can.</p>

@if(session('success'))
    <div class="flash flash-success" data-flash>
        {{ session('success') }}
    </div>
@endif

@if ($errors->any())
    <div class="flash flash-error" data-flash>
        @if ($errors->has('rate_limit'))
            {{ $errors->first('rate_limit') }}
        @else
            {{ $errors->first() }}
        @endif
    </div>
@endif

<form action="{{ route('contact.submit') }}" method="POST" class="contact-form">
    @csrf

    <div class="field">
        <input type="text" name="name" placeholder=" " value="{{ old('name') }}" required>
        <label>Name</label>
    </div>

    <div class="field">
        <input type="email" name="email" placeholder=" " value="{{ old('email') }}" required>
        <label>Email</label>
    </div>

    <div class="field">
        <textarea name="message" rows="4" placeholder=" " required>{{ old('message') }}</textarea>
        <label>Message</label>
    </div>

    <button type="submit" id="submitBtn">Send message</button>
</form>

<script>
    const form = document.querySelector('form');
    const button = document.getElementById('submitBtn');

    form.addEventListener('submit', () => {
        button.disabled = true;
        button.innerText = 'Sending...';
    });
</script>

<script>
    // Auto-hide flash messages
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('[data-flash]').forEach(el => {
                el.classList.add('fade-out');
                setTimeout(() => el.remove(), 400);
            });
        }, 3500); // 3.5 seconds
    });
</script>
@endsection
