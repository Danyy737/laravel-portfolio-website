@extends('layouts.portfolio')

@section('content')
<h2 class="page-title">Contact</h2>
<p class="page-subtitle">Feel free to reach out — I’ll reply as soon as I can.</p>

<!-- @if(session('success'))
    <div class="success-message fade-in">
        {{ session('success') }}
    </div>
@endif -->

<form action="/contact" method="POST" class="contact-form">
    @csrf

    <div class="field">
        <input type="text" name="name" placeholder=" " required>
        <label>Name</label>
    </div>

    <div class="field">
        <input type="email" name="email" placeholder=" " required>
        <label>Email</label>
    </div>

    <div class="field">
        <textarea name="message" rows="4" placeholder=" " required></textarea>
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
@endsection

@if(session('success'))
    <div class="success-message fade-in">
        {{ session('success') }}
    </div>
@endif
