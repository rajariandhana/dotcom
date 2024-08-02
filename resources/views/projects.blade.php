<x-layout>
    {{-- @dump($projects) --}}
    <div class="flex flex-wrap justify-center
    mx-2 md:mx-12 lg:-mx-36 p-4
    rounded-xl gap-4 bg-slate-950">
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
    </div>
    {{-- <div class="flex flex-wrap justify-center -mx-12 gap-4 bg-slate-950">
        <div class="flex gap-4">
            <div class="flex flex-col gap-4">
                <div class="w-28 h-28 rounded-xl flex justify-center items-center bg-red-400 text-white">
                    <img src="/Projects/Minesweeper/1.png" alt="" class="object-cover w-28 h-28">
                </div>
                <div class="w-28 h-28 rounded-xl flex justify-center items-center bg-orange-400 text-white">

                </div>
            </div>
            <div class="w-60 h-60 rounded-xl flex justify-center items-center bg-yellow-300 text-white">

            </div>
        </div>
        <div class="flex gap-4">
            <div class="flex flex-col gap-4">
                <div class="w-60 h-28 rounded-xl flex justify-center items-center bg-lime-400 text-white">

                </div>
                <div class="w-60 h-28 rounded-xl flex justify-center items-center bg-emerald-400 text-white">

                </div>
            </div>
            <div class="w-28 h-60 rounded-xl flex justify-center items-center bg-cyan-300 text-white">

            </div>
        </div>
    </div> --}}
</x-layout>
