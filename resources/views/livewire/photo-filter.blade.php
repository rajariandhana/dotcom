<div>
    <div class="flex mb-4 justify-center">
        <ul class="flex flex-row justify-center items-center gap-2">
            @foreach ($cities as $city)
                <li>
                    <input id="{{ $city }}" class="hidden peer" type="checkbox" wire:click="filtering"
                        wire:model="selectedCities" value="{{ $city }}">
                    <label for="{{ $city }}"
                        class="text-sm px-6 py-1 rounded-lg cursor-pointer
                        bg-indigo-100 border-2 border-indigo-300 peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $city }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="flex mb-4 justify-center">
        <ul class="flex flex-row justify-center items-center gap-2">
            @foreach ($years as $year)
                <li>
                    <input id="{{ $year }}" class="hidden peer" type="checkbox" wire:click="filtering"
                        wire:model="selectedYears" value="{{ $year }}">
                    <label for="{{ $year }}"
                        class="text-sm px-6 py-1 rounded-lg cursor-pointer
                        bg-indigo-100 border-2 border-indigo-300 peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $year }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="flex flex-wrap justify-center gap-4 mt-8 lg:mt-12 lg:-mx-48">
        @foreach ($photos as $photo)
            <img class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40  rounded-md object-cover
            hover:scale-110 transition ease-in-out"
            src="{{ asset('/Gallery/' . $photo->year . '_' . $photo->city . '/' . $photo->file) }}"
            alt="/Gallery/' . $photo->year . '_' . $photo->city . '/' . $photo->file) }}">
        @endforeach
    </div>
</div>
