@php
    $boxClass = match ($project->size) {
        'BOX-SM' => 'w-20 h-20 lg:w-[144px] lg:h-[144px]',
        'BOX-LG' => 'w-44 h-44 lg:w-[304px] lg:h-[304px]',
        'WIDE' => 'w-44 h-20 lg:w-[304px] lg:h-[144px]',
        'TALL' => 'w-20 h-44 lg:w-[144px] lg:h-[304px]',
        default => '',
    };
@endphp

<div class="rounded-lg block overflow-hidden justify-center items-center
    group transition-all ease-out duration-150 z-10  {{ $boxClass }}
    ">
    <a href="/projects/{{ $project->slug }}" class="relative block">
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-150 flex items-center justify-center">
            <span class="bg-indigo-500 text-white px-4 py-2 rounded-lg text-md opacity-0 group-hover:opacity-100 transition duration-150 z-20">
                @lang('f.view')
            </span>
        </div>

        <img src="Projects/{{ $project->slug }}/1.{{ $project->extension }}" alt=""
            class="
             w-20 h-20 object-cover object-top {{ $boxClass }}">
    </a>
</div>
