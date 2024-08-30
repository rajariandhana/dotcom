<div>
    @if ($bigPhoto != '')
        <div class="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full">
            <div wire:click="view('')"
                class="fixed top-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full bg-black opacity-60">
            </div>
            <img class="fixed z-20 object-cover p-4 transition ease-in-out bg-gray-100 h-2/3 top-55 left-50"
                src="{{ asset($bigPhoto) }}" alt="{{ $bigPhoto }}">
        </div>
    @endif

    <div class="flex justify-center mb-4">
        <ul class="flex flex-row items-center justify-center gap-2">
            @foreach ($years as $year)
                <li>
                    <input id="{{ $year }}" class="hidden peer" type="checkbox" wire:click="filter"
                        wire:model="selectedYears" value="{{ $year }}">
                    <label for="{{ $year }}"
                        class="px-6 py-1 text-sm bg-indigo-100 border-2 border-indigo-300 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $year }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="flex justify-center mb-4">
        <ul class="flex flex-row items-center justify-center gap-2">
            @foreach ($cities as $city)
                <li>
                    <input id="{{ $city }}" class="hidden peer" type="checkbox" wire:click="filter"
                        wire:model="selectedCities" value="{{ $city }}">
                    <label for="{{ $city }}"
                        class="px-6 py-1 text-sm bg-indigo-100 border-2 border-indigo-300 rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $city }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="flex flex-wrap justify-center gap-4 mt-8 lg:mt-12 lg:-mx-48">
        @foreach ($images as $folder => $files)
            @foreach ($files as $file)
                <img wire:click="view('{{$file}}')"
                    class="object-cover w-24 h-24 transition ease-in-out rounded-md cursor-pointer md:w-32 md:h-32 lg:w-40 lg:h-40 hover:scale-110"
                    src="{{asset($file)}}"
		            alt="{{asset($file)}}">
            @endforeach
        @endforeach
        @if ($message!='EMPTY')
        <div class="flex items-center justify-center w-96 h-96">
            <span class="text-center text-red-500">{{$message}}</span>

        </div>
        @endif
    </div>
</div>
