
<div class="grid grid-cols-3 gap-4">
    <div class="fixed top-0 right-0 left-0 z-10 flex justify-center items-center w-full h-full">
        <div wire:click="view('')"
            class="fixed top-0 right-0 left-0 z-10 flex justify-center items-center w-full h-full bg-black opacity-60">
        </div>
        <img class="h-2/3 object-cover transition ease-in-out
        fixed top-55 left-50 bg-gray-100 p-4  z-20"
            src="{{ asset($bigPhoto) }}" alt="{{ $bigPhoto }}">
    </div>
    <x-shots size="TALL" photo="IMG_9509"></x-shots>
    <x-shots size="TALL" photo="IMG_9525"></x-shots>
    <x-shots size="TALL" photo="IMG_9521"></x-shots>
</div>
