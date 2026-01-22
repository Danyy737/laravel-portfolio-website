<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'Admin')</title>

    {{-- Tailwind/Vite --}}
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <div class="min-h-screen flex">

        <!-- Sidebar -->
        <aside class="w-64 bg-gray-900 text-white flex flex-col">
            <div class="p-6 text-xl font-bold border-b border-gray-800">
                Admin Panel
            </div>

            <nav class="flex-1 p-4 space-y-2">
                <a href="{{ route('admin.projects.index') }}"
                   class="block px-4 py-2 rounded transition hover:bg-gray-800">
                    Dashboard
                </a>

                <div class="p-4 border-t border-gray-800">
    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button
            type="submit"
            class="w-full text-left px-4 py-2 rounded text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
        >
            Logout
        </button>
    </form>
</div>
            </nav>

            <div class="p-4 border-t border-gray-800">
                <a href="{{ url('/') }}" class="text-sm text-gray-300 hover:text-white">
                    ← Back to site
                </a>
            </div>
        </aside>

        <!-- Main -->
        <div class="flex-1 flex flex-col">

            <!-- Topbar -->
          <header class="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">

           <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
    @yield('page_title', 'Dashboard')
</h1>
<p class="text-sm text-gray-600 dark:text-gray-400">
    Manage your portfolio content
</p>

                <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600">Admin</span>

                    {{-- If you have auth --}}
                    {{-- <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button class="px-3 py-2 text-sm rounded bg-gray-900 text-white hover:bg-gray-800">
                            Logout
                        </button>
                    </form> --}}
                </div>
            </header>

<!-- Content -->
<main class="p-6">

    {{-- Flash messages (auto-hide) --}}
    @if (session('success'))
        <div data-flash
             class="mb-4 rounded-lg border border-green-200 dark:border-green-900
                    bg-green-50 dark:bg-green-950
                    text-green-700 dark:text-green-200
                    px-4 py-3">
            {{ session('success') }}
        </div>
    @endif

    @if (session('danger'))
        <div data-flash
             class="mb-4 rounded-lg border border-red-200 dark:border-red-900
                    bg-red-50 dark:bg-red-950
                    text-red-700 dark:text-red-200
                    px-4 py-3">
            {{ session('danger') }}
        </div>
    @endif

    @yield('content')

</main>

{{-- Auto-hide flash messages after 3 seconds --}}
<script>
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('[data-flash]').forEach(el => el.remove());
        }, 3000);
    });
</script>
            </main>

        </div>
    </div>
</body>
</html>

