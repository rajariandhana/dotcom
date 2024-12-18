<x-layout  title="Experience">
    <div class="flex justify-end mb-4">
        <a href="/cv-generate" download
            class="flex items-center justify-center gap-3 px-4 py-2 font-semibold text-white shadow-md rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500">
            <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
            </svg>
            Download CV as pdf
        </a>
    </div>
    {{-- <div class="flex flex-wrap"> --}}
    <div class="">
        @foreach ($employers as $employer)
            <div class="mb-8">
                <div class="p-4 mb-4 bg-gray-200 shadow-md rounded-xl">
                    <a href="{{ $employer->link }}" target="_blank" class="flex items-center justify-start gap-2 w-fit text-indigo-950 hover:text-indigo-800">
                        <img src="/CV/{{ $employer->slug }}.png" alt="" class="h-8 ">
                        <h2 class="text-lg font-montserrat">{{ $employer->name }}</h2>
                        <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                        </svg>
                    </a>

                </div>

                <ol class="relative ml-6 border-indigo-900 border-s ">
                    @foreach ($employer->positions as $position)
                        <li class="mb-6 ms-4">
                            <div
                                class="absolute w-3 h-3 bg-indigo-900 rounded-full mt-1.5 -start-1.5 border border-indigo-900 ">
                            </div>
                            <time
                                class="mb-1 text-xs font-normal leading-none text-gray-500 ">{{ $position->date }}</time>
                            <h3 class="font-semibold text-gray-900 text-md font-montserrat">{{ $position->name }}</h3>
                            <p class="mb-2 mr-12 text-sm font-normal text-gray-500">{{ $position->description }}</p>
                            <div class="flex flex-wrap gap-1">
                                @foreach (explode('|', $position->skills) as $skill)
                                    <span
                                        class="px-4 py-2 text-xs text-white rounded-lg bg-indigo-950">{{ $skill }}</span>
                                @endforeach
                            </div>
                        </li>
                    @endforeach
                </ol>
            </div>
        @endforeach
    </div>

</x-layout>
