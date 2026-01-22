@extends('layouts.admin')

@section('page_title', 'Testimonials')

@section('content')
<div class="max-w-6xl space-y-6">

    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-100">
            Testimonials
        </h2>

        <a href="{{ route('admin.testimonials.create') }}"
           class="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition
                  dark:bg-gray-800 dark:hover:bg-gray-700">
            + Add Testimonial
        </a>
    </div>

    {{-- Testimonials card --}}
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">

        @if($testimonials->count())
            <table class="w-full text-sm">
                <thead class="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th class="px-6 py-3 text-left">Project</th>
                        <th class="px-6 py-3 text-left">Author</th>
                        <th class="px-6 py-3 text-left">Quote</th>
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($testimonials as $testimonial)
                        <tr class="border-t border-gray-200 dark:border-gray-800">
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                {{ $testimonial->project?->title ?? '—' }}
                            </td>

                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                                {{ $testimonial->author_name }}
                                @if($testimonial->author_role)
                                    <span class="text-gray-400">({{ $testimonial->author_role }})</span>
                                @endif
                            </td>

                            <td class="px-6 py-4 text-gray-600 dark:text-gray-300">
                                {{ \Illuminate\Support\Str::limit($testimonial->quote, 90) }}
                            </td>

                            <td class="px-6 py-4 text-right whitespace-nowrap space-x-3">
                                <a href="{{ route('admin.testimonials.edit', $testimonial) }}"
                                   class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    Edit
                                </a>
<form action="{{ route('admin.testimonials.destroy', $testimonial) }}"
      method="POST"
      class="inline"
      onsubmit="return confirm('Delete this testimonial? This cannot be undone.');">
    @csrf
    @method('DELETE')
    <button type="submit" class="text-sm text-red-600 hover:underline">
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
                No testimonials found.
            </div>
        @endif

    </div>

</div>
@endsection
