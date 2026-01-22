@extends('layouts.admin')

@section('page_title', 'Add Project')

@section('content')
<div class="max-w-3xl space-y-6">

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Add New Project</h2>
        <p class="mt-1 text-gray-600 dark:text-gray-300">
            Create a new project that will be stored in your database.
        </p>
    </div>

    <form method="POST" action="{{ route('admin.projects.store') }}"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 space-y-5">
        @csrf

        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input name="title" value="{{ old('title') }}" required
                   class="mt-1 w-full rounded-md bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                          text-gray-900 dark:text-gray-100 px-3 py-2">
            @error('title') <p class="mt-1 text-sm text-red-500">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea name="description" rows="5" required
                      class="mt-1 w-full rounded-md bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                             text-gray-900 dark:text-gray-100 px-3 py-2">{{ old('description') }}</textarea>
            @error('description') <p class="mt-1 text-sm text-red-500">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tech (comma separated)
            </label>
            <input name="tech" value="{{ old('tech') }}" placeholder="C#, WinForms, SQL Server"
                   class="mt-1 w-full rounded-md bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                          text-gray-900 dark:text-gray-100 px-3 py-2">
            @error('tech') <p class="mt-1 text-sm text-red-500">{{ $message }}</p> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link (GitHub)</label>
            <input name="link" value="{{ old('link') }}" placeholder="https://github.com/..."
                   class="mt-1 w-full rounded-md bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700
                          text-gray-900 dark:text-gray-100 px-3 py-2">
            @error('link') <p class="mt-1 text-sm text-red-500">{{ $message }}</p> @enderror
        </div>

        <div class="flex gap-3">
            <button type="submit"
                    class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition
                           dark:bg-gray-800 dark:hover:bg-gray-700">
                Save Project
            </button>

            <a href="{{ route('admin.projects.index') }}"
               class="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition
                      dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                Cancel
            </a>
        </div>
    </form>
</div>
@endsection
