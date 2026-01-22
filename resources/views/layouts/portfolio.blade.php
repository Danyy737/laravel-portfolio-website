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
    </main>

    @include('components.footer')

    
</body>
</html>
