<x-layout>
    {{-- <div class="bg-white rounded-lg shadow"> --}}

    <div class="w-full mb-8">
        {{-- <span class="font-mono text-lg font-semibold text-indigo-500">Hello, world!</span> --}}
        <div class="flex">
            <img src="/ProfilePicture.jpg" alt=""
                class="size-32 rounded-full object-cover
            bg-gradient-to-r from-indigo-500 to-rose-500 p-1 mb-12">
            {{-- <div class="ml-4">
                <span class="ml-4 text-xs">quotes of the day</span>
                <div class="mt-2 max-w-52 px-2 py-2 text-xs bg-gray-300 rounded-xl shadow-lg">
                    Wealth, fame, power, The King of The Pirates, Gol D. Roger attained everything this world had to
                    offer
                </div>
                <div class="">

                </div>
            </div> --}}
        </div>
        <h1
            class="bg-gradient-to-r from-indigo-500 to-rose-500 inline-block text-transparent bg-clip-text
        text-xl font-mono font-bold">
            Hello, world!
        </h1>
        🌎
        <p class="text-justify">
            You'll find several of my best works such as my projects as a developer, my interest in photography, clothes
            that I design and sell, as well as other surprises.
        </p>
        <span class="text-sm text-gray-600">Feel free to hit me up in any of my social media</span>
    </div>

    <div>
        <h2 class="text-xl font-semibold mb-4">Best works</h2>
        <div class="flex gap-2">
            <div class="flex flex-col gap-2">
                <div class="size-20 bg-red-400 rounded-xl flex justify-center items-center text-white">1</div>
                <div class="size-20 bg-orange-400 rounded-xl flex justify-center items-center text-white">2</div>
            </div>
            <div class="flex flex-col">
                <div class="size-40 bg-yellow-400 rounded-xl flex justify-center items-center text-white">3</div>
            </div>
        </div>
        {{-- <div class="grid grid-cols-3 gap-4 h-full">
            <div class="col-span-2 h-24 w-56 bg-red-400 rounded-lg"></div>
            <div class="row-span-2 h-56 w-24 bg-orange-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-yellow-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-green-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-blue-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-indigo-400 rounded-lg"></div>
        </div> --}}
        <div class="flex items-center justify-center gap-2">
            <div class="grid h-full w-full grid-cols-3 grid-rows-2 gap-2">
                <div
                    class="col-span-1 row-span-1 size-36 bg-red-400 rounded-xl flex justify-center items-center text-white">
                    1</div>
                <div
                    class="col-span-2 row-span-2 size-36 bg-yellow-400 rounded-xl flex justify-center items-center text-white">
                    3</div>
                <div
                    class="col-span-1 row-span-1 size-36 bg-orange-400 rounded-xl flex justify-center items-center text-white">
                    2</div>
            </div>
        </div>

        <div class="flex h-64 w-64 md:h-96 md:w-96 items-center justify-center gap-2">
            <div class="grid h-full w-full grid-cols-3 grid-rows-4 gap-2">
                <div class="col-span-1 row-span-1 bg-red-400 rounded-xl flex justify-center items-center text-white">1
                </div>
                <div class="col-span-2 row-span-2 bg-yellow-400 rounded-xl flex justify-center items-center text-white">
                    3</div>
                <div class="col-span-1 row-span-1 bg-orange-400 rounded-xl flex justify-center items-center text-white">
                    2</div>


                <div class="col-span-2 row-span-1 bg-green-400 rounded-xl flex justify-center items-center text-white">4
                </div>
                <div class="col-span-1 row-span-2 bg-indigo-400 rounded-xl flex justify-center items-center text-white">
                    6</div>
                <div class="col-span-2 row-span-1 bg-blue-400 rounded-xl flex justify-center items-center text-white">5
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-4 text-center">Developer Journey</h2>

    </div>
    {{-- <div>
        <script src="https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.min.js"></script>

        <link rel="stylesheet"
            href="https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.css" />
        <div class="calendar">
            Loading the data just for you.
        </div>

        <script>
            new GitHubCalendar(".calendar", "rajariandhana");
        </script>
    </div> --}}
</x-layout>
