@extends('layouts.admin')

@section('page_title', 'Edit Testimonial')

@section('content')
<div class="max-w-3xl space-y-6">

    <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-100">Edit Testimonial</h2>

        <a href="{{ route('admin.testimonials.index') }}"
           class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            ← Back
        </a>
    </div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <form method="POST" action="{{ route('admin.testimonials.update', $testimonial) }}" class="space-y-5">
            @csrf
            @method('PUT')

            {{-- Project --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
                <select name="project_id"
                        class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        required>
                    @foreach($projects as $project)
                        <option value="{{ $project->id }}"
                            @selected(old('project_id', $testimonial->project_id) == $project->id)>
                            {{ $project->title }}
                        </option>
                    @endforeach
                </select>
                @error('project_id') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            {{-- Author name --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author name</label>
                <input type="text"
                       name="author_name"
                       value="{{ old('author_name', $testimonial->author_name) }}"
                       class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                       required>
                @error('author_name') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            {{-- Author role (optional) --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author role (optional)</label>
                <input type="text"
                       name="author_role"
                       value="{{ old('author_role', $testimonial->author_role) }}"
                       class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
                @error('author_role') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            {{-- Quote --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote</label>
                <textarea name="quote"
                          rows="4"
                          class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                          required>{{ old('quote', $testimonial->quote) }}</textarea>
                @error('quote') <p class="text-sm text-red-600 mt-1">{{ $message }}</p> @enderror
            </div>

            <div class="flex items-center gap-3">
                <button type="submit"
                        class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition
                               dark:bg-gray-800 dark:hover:bg-gray-700">
                    Save Changes
                </button>

                <a href="{{ route('admin.testimonials.index') }}"
                   class="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition
                          dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                    Cancel
                </a>
            </div>
        </form>
    </div>

</div>
@endsection
