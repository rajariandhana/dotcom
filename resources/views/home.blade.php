<x-layout title="Home">
    {{-- <div class="bg-white rounded-lg shadow"> --}}

    <div class="w-full mb-12">
        {{-- <span class="font-mono text-lg font-semibold text-indigo-500">Hello, world!</span> --}}
        <div class="flex">
            <img src="/ProfilePicture.jpg" alt=""
                class="size-32 rounded-full object-cover
            bg-gradient-to-r from-indigo-500 to-rose-500 p-1 mb-12">
            <x-qotd></x-qotd>
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
            @lang('f.helloWorld')
        </h1>
        🌎
        <p class="text-justify">
            @lang('f.profDesc')
        </p>
        <span class="text-sm text-gray-600">@lang('f.profSubDesc')</span>
    </div>

    <div class="mb-12">
        <h2 class="text-xl font-montserrat mb-4">📷 💜</h2>
        @livewire('best-shots')
    </div>

    <div class="mb-12">
        <h2 class="text-sm lg:text-xl text-center font-montserrat mb-4">@lang('f.techsTitle')</h2>
        <x-tech></x-tech>
    </div>

    <div class="mb-8">
        <p class="text-center w-auto mb-12 text-sm text-gray-500 rounded-md">@lang('f.tall') 👇</p>
        <x-tall></x-tall>
    </div>
    {{-- <div class="mb-12">
        <h2 class="text-xl font-semibold mb-4 text-center">Developer Journey</h2>

    </div> --}}
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
