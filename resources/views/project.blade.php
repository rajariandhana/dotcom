@php
    $imageWidth = match ($project->size) {
        // 'TALL' => 'w-40',
        default => 'w-80',
    };
    $cardWidth = match ($project->size) {
        'TALL' => 'w-[688px]',
        default => 'w-[352px]',
    };
    $cardFlex = match ($project->size) {
        'TALL' => 'flex-row',
        default => 'flex-col',
    };
@endphp

<x-layout>
    {{-- @dump(($project)) --}}
    <a href="{{ route('projects') }}" class="flex w-fit gap-2 text-indigo-500">
        <svg class="flex w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
        </svg>
        Back to projects
    </a>

    <div class="flex {{$cardFlex}} gap-4 p-4 bg-gray-200 rounded-xl {{$cardWidth}}">
        <div class="rounded-lg block overflow-hidden justify-center items-center  {{ $imageWidth }}">
            <img src="/Projects/{{ $project->name }}/1.{{ $project->extension }}" alt=""
                class="object-cover object-top {{ $imageWidth }}">
        </div>
        <div class="flex flex-col gap-2">
            <h2 class="font-semibold">{{ $project->name }}</h2>
            <p class="content-justify">{{ $project->desc }}</p>
            {{-- <span>{{$project->techs}}</span> --}}
            <div class="flex flex-wrap gap-2">
                @foreach ($techs as $tech)
                    <span class="px-2 py-1 bg-slate-900 rounded-md text-white text-sm">{{$tech}}</span>
                @endforeach
            </div>
            <div class="flex flex-wrap gap-2">
                @isset($project->repo)
                    <a href="https://{{$project->repo}}" target="_blank" class="px-2 py-1 bg-slate-700 rounded-md text-white text-sm">Repo</a>
                @endisset
                @isset($project->demo)
                    <a href="https://{{$project->demo}}" target="_blank" class="px-2 py-1 bg-slate-700 rounded-md text-white text-sm">Demo</a>
                @endisset
            </div>
        </div>
    </div>
</x-layout>
