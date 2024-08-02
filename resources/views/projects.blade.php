<x-layout>
    {{-- @dump($projects) --}}
    <div class="flex justify-center">
    <div class="flex flex-col justify-center w-[304px] md:w-[572px] lg:w-[956px]
    lg:-mx-36
    grid grid-cols-1 md:grid-cols-2
    p-4
    rounded-xl gap-4 bg-slate-950"
    >
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
    </div>
</div>
</x-layout>
