@php
    $boxClass = match ($project->size) {
        'BOX-SM' => 'w-20 h-20 lg:w-[144px] lg:h-[144px]',
        'BOX-LG' => 'w-44 h-44 lg:w-[304px] lg:h-[304px]',
        'WIDE' => 'w-44 h-20 lg:w-[304px] lg:h-[144px]',
        'TALL' => 'w-20 h-44 lg:w-[144px] lg:h-[304px]',
        default => ''
    };
@endphp

<div class="rounded-lg block overflow-hidden justify-center items-center  {{ $boxClass }}

">
    <a href="/projects/{{$project->slug}}">
    <div class="relative hidden hover:hidden hover:bg-black {{$boxClass}} hover:opacity-30"></div>

    <img src="Projects/{{$project->name}}/1.{{$project->extension}}" alt=""
         class="hover:scale-110 ease-in duration-150 w-20 h-20 object-cover object-top {{$boxClass}}">
        </a>
</div>
