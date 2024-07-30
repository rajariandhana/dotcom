<x-layout>
    {{-- <div class="bg-white rounded-lg shadow"> --}}

    <div class="w-full mb-8">
        {{-- <span class="font-mono text-lg font-semibold text-indigo-500">Hello, world!</span> --}}
        <img src="/ProfilePicture.jpg" alt=""
            class="size-32 rounded-full object-cover
        bg-gradient-to-r from-indigo-500 to-rose-500 p-1 mb-12">
        <h1
            class="bg-gradient-to-r from-indigo-500 to-rose-500 inline-block text-transparent bg-clip-text
        text-xl font-mono font-bold">
            Hello, world!
        </h1>
        🌎
        <p class="text-justify">
            You'll find several of my best works such as my projects as a developer, my interest in photography, clothes that I design and sell, as well as other surprises.
        </p>
        <span class="text-sm text-gray-600">Feel free to hit me up in any of my social media</span>
    </div>

    <div>
        <h2 class="text-xl font-semibold mb-4">Best works</h2>
        <div class="grid grid-cols-3 gap-4 h-full">
            <div class="col-span-2 h-24 w-56 bg-red-400 rounded-lg"></div>
            <div class="row-span-2 h-56 w-24 bg-orange-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-yellow-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-green-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-blue-400 rounded-lg"></div>
            <div class="col-span-1 h-24 w-24 bg-indigo-400 rounded-lg"></div>
        </div>
    </div>
    <div>
        <h2 class="text-xl font-semibold mb-4 text-center">Developer Journey</h2>

    </div>
</x-layout>
