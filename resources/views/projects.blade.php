<x-layout title="Projects">
    {{-- @dump($projects) --}}

    <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center w-[304px] md:w-[572px] lg:w-[956px] lg:-mx-36 mb-4">
            {{-- <ul class="flex gap-2">
                <li>
                    <button class="px-2 py-1 bg-slate-900 text-sm text-white rounded-md">Web</button>
                </li>
                <li>
                    <button class="px-2 py-1 bg-slate-900 text-sm text-white rounded-md">Game</button>
                </li>
            </ul> --}}
        <p class="text-center w-auto mb-0 lg:mb-4 text-sm text-gray-500 rounded-md">@lang('f.click') 👇</p>

        </div>
        <div
            class="flex flex-col justify-center w-[304px] md:w-[572px] lg:w-[956px]
                lg:-mx-36
                grid grid-cols-1 md:grid-cols-2
                p-4
                rounded-xl gap-4 bg-slate-900">
            <div class="flex gap-4">
                <div class="flex flex-col gap-4">
                    <x-project-card :project="$projects[0]"></x-project-card>
                    <x-project-card :project="$projects[1]"></x-project-card>
                </div>
                <x-project-card :project="$projects[2]"></x-project-card>

            </div>
            <div class="flex gap-4">
                <div class="flex flex-col gap-4">
                    <x-project-card :project="$projects[3]"></x-project-card>
                    <x-project-card :project="$projects[4]"></x-project-card>
                </div>
                <x-project-card :project="$projects[5]"></x-project-card>

            </div>
            <div class="flex gap-4">
                <x-project-card :project="$projects[6]"></x-project-card>
                <x-project-card :project="$projects[7]"></x-project-card>
            </div>
            <div class="hidden md:flex gap-4">
                <div
                    class="flex rounded-lg justify-center items-center
                    w-[272px] h-44 lg:w-[464px] lg:h-[304px]
                    bg-indigo-100 text-slate-950 text-xl font-bold

                    ">
                    @lang('f.underMain')
                </div>
            </div>
        </div>
    </div>
</x-layout>
