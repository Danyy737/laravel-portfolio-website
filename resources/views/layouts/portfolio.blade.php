<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ config('app.name', 'Portfolio') }}</title>

    {{-- YOUR ORIGINAL CSS --}}
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>
    @include('components.navbar')

    <main>
        @yield('content')
        <div class="nav-auth">
    @auth
        @if (auth()->user()->email === 'mouradany2004@gmail.com' || (bool) auth()->user()->is_admin)
            <a href="{{ route('admin.dashboard') }}" class="btn btn-admin">Admin</a>
        @endif

        <form method="POST" action="{{ route('logout') }}" class="inline">
            @csrf
            <button type="submit" class="btn btn-ghost">Logout</button>
        </form>
    @else
        <a href="{{ route('login') }}" class="btn btn-ghost">Login</a>
    @endauth
    </main>

    @include('components.footer')
</body>

</div>
</html>
