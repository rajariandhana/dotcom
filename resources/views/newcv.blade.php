<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite(['resources/css/app.css','resources/js/app.js'])
    <title>CV</title>
    <style>
        body{
            background-size: 0 0;
            font-family: 'Times New Roman', Times, serif
            /* background-image: */
            /* radial-gradient(circle, white 0px, rgba(0, 0, 0, 0) 0px); */
        }
    </style>
</head>
<body>
    <div class="items-center mb-12 text-center">
        <h1 class="font-bold">Ralfazza Rajariandhana</h1>
        <p>Indonesia</p>
        <p class="">
            <a class="underline" href="mailto:rajariandhana@gmail.com">rajariandhana@gmail.com</a> |
            <a class="underline" href="https://www.linkedin.com/in/rajariandhana">linkedin.com/in/rajariandhana</a> |
            <a class="underline" href="https://www.ralfazza.com">ralfazza.com</a>
        </p>
    </div>
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
</body>
</html>