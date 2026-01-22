@extends('layouts.admin')

@section('page_title', 'Dashboard')

@section('content')
<div class="max-w-6xl space-y-6">

    {{-- Header card --}}
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h2>
        <p class="mt-1 text-gray-600 dark:text-gray-300">
            You are logged in. Manage your portfolio content here.
        </p>

        <div class="mt-4 flex gap-3">
            <a href="{{ route('admin.projects.index') }}"
               class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition
                      dark:bg-gray-800 dark:hover:bg-gray-700">
                Manage Projects
            </a>

            <a href="{{ url('/') }}"
               class="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition
                      dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                View Site
            </a>
        </div>
    </div>

    {{-- Projects preview --}}
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Projects</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">A quick look at what’s in your database.</p>
        </div>

        @if(isset($projects) && $projects->count())
            <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th class="text-left px-6 py-3">Title</th>
                        <th class="text-left px-6 py-3">Tech</th>
                        <th class="text-left px-6 py-3">Link</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($projects as $project)
                        <tr class="border-t border-gray-200 dark:border-gray-800">
                            <td class="px-6 py-3 font-medium text-gray-900 dark:text-gray-100">
                                {{ $project->title }}
                            </td>
                            <td class="px-6 py-3 text-gray-600 dark:text-gray-300">
                                {{ $project->tech_stack ?? '—' }}
                            </td>
                            <td class="px-6 py-3">
                                @if($project->github_url)
                                    <a href="{{ $project->github_url }}" target="_blank"
                                       class="text-blue-600 dark:text-blue-400 hover:underline">
                                        View Code →
                                    </a>
                                @else
                                    <span class="text-gray-400">—</span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                <a href="{{ route('admin.projects.index') }}"
                   class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View all projects →
                </a>
            </div>
        @else
            <div class="p-6 text-gray-600 dark:text-gray-400">
                No projects found yet.
            </div>
        @endif
    </div>

</div>

@endsection
