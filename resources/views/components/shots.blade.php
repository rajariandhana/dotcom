<div class="shadow-xl hover:-rotate-3 group hover:scale-105 transition-all ease-out duration-300 z-10 cursor-pointer">
    {{-- @dump($photo) --}}
    <img wire:click="view('{{$file}}')" class=" w-64 p-1 bg-white"
    src="{{$file}}"
    alt="{{$file}}">

</div>
