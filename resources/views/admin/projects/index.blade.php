@extends('layouts.admin')

@section('page_title', 'Projects')

@section('content')
<div class="max-w-6xl space-y-6">

    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-100">
            Projects
        </h2>

        <a href="{{ route('admin.projects.create') }}"
           class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition
                  dark:bg-gray-800 dark:hover:bg-gray-700">
            + Add Project
        </a>
    </div>

    {{-- Projects card --}}
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">

        @if($projects->count())
            <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th class="px-6 py-3 text-left">Title</th>
                        <th class="px-6 py-3 text-left">Description</th>
                        <th class="px-6 py-3 text-left">Tech</th>
                        <th class="px-6 py-3 text-left">Link</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($projects as $project)
                        <tr class="border-t border-gray-200 dark:border-gray-800">
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                {{ $project->title }}
                            </td>

                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                                {{ $project->description }}
                            </td>

                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                                {{ is_array($project->tech) ? implode(', ', $project->tech) : $project->tech }}
                            </td>

                            <td class="px-6 py-4">
                                @if($project->link)
                                    <a href="{{ $project->link }}" target="_blank"
                                       class="text-blue-600 dark:text-blue-400 hover:underline">
                                        View Code →
                                    </a>
                                @else
                                    <span class="text-gray-400">—</span>
                                @endif
                            </td>

                            <td class="px-6 py-4 text-right whitespace-nowrap space-x-3">
                                <a href="{{ route('admin.projects.edit', $project) }}"
                                   class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    Edit
                                </a>

                                <form action="{{ route('admin.projects.destroy', $project) }}"
                                      method="POST"
                                      class="inline"
                                      onsubmit="return confirm('Delete this project? This cannot be undone.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit"
                                            class="text-sm text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="p-6 text-gray-600 dark:text-gray-400">
                No projects found.
            </div>
        @endif

    </div>

</div>
@endsection
