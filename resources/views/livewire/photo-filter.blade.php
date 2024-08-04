<div>
    <div class="flex mb-4">
        <ul class="flex flex-row justify-center items-center gap-2">
            @foreach ($cities as $city)
                <li>
                    <input id="{{ $city }}" class="hidden peer" type="checkbox" wire:click="filtering"
                        wire:model="selectedCities" value="{{ $city }}">
                    <label for="{{ $city }}"
                        class="text-sm px-6 py-1 rounded-lg cursor-pointer
                        bg-indigo-200 border-2 border-indigo-500 peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $city }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="flex mb-4">
        <ul class="flex flex-row justify-center items-center gap-2">
            @foreach ($years as $year)
                <li>
                    <input id="{{ $year }}" class="hidden peer" type="checkbox" wire:click="filtering"
                        wire:model="selectedYears" value="{{ $year }}">
                    <label for="{{ $year }}"
                        class="text-sm px-6 py-1 rounded-lg cursor-pointer
                        bg-indigo-200 border-2 border-indigo-500 peer-checked:text-white peer-checked:bg-indigo-500">
                        {{ $year }}
                    </label>
                </li>
            @endforeach
        </ul>
    </div>
    <div class="">
        @foreach ($photos as $photo)
            <div class="photo-item">
                <img src="{{ $photo->filePath }}" alt="Photo">
                <p>/{{ $photo->year }}_{{ $photo->city }}/{{ $photo->file }} , </p>
            </div>
        @endforeach
    </div>
</div>
