
<div class="grid grid-cols-3 gap-4 z-10">
    @if ($bigPhoto != '')
        <div class="fixed top-0 right-0 left-0 z-20 flex justify-center items-center w-full h-full">
            <div wire:click="view('')"
                class="fixed top-0 right-0 left-0 z-20 flex justify-center items-center w-full h-full bg-black opacity-60">
            </div>
            <img class="h-2/3 object-cover transition ease-in-out
            fixed top-55 left-50 z-20"
                src="{{ asset($bigPhoto) }}" alt="{{ $bigPhoto }}">
        </div>
    @endif
    @foreach ($files as $file)
        <div class="shadow-xl hover:-rotate-3 group hover:scale-105 transition-all ease-out duration-300 cursor-pointer">
            {{-- @dump($photo) --}}
            <img wire:click="view('{{$file}}')" class=" w-64 p-1 bg-white"
            src="{{asset($file)}}"
            alt="{{asset($file)}}">

        </div>
    @endforeach
    {{-- <x-shots size="TALL" file="asset('Gallery/IMG_9509.JPG')"></x-shots> --}}
    {{-- <x-shots size="TALL" file="IMG_9525.JPG"></x-shots> --}}
    {{-- <x-shots size="TALL" file="IMG_9521.JPG"></x-shots> --}}
</div>
