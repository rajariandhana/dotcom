<nav x-data="{ open: false }" @click.outside="open=false"
class="fixed top-0 flex px-6 py-3 justify-between items-center w-full shadow-md bg-gray-100 z-20">
    <a href="{{route('home')}}" class=" text-2xl">
        ralfazza.com
    </a>
    <button @click="open = !open">
        <svg class="w-12 h-12 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
            height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
        </svg>
    </button>
    <div :class="{ 'translate-x-0': open, 'translate-x-full': !open }"
        class="z-20 fixed top-0 right-0 w-80 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-full
        px-6 py-3 flex flex-col justify-between rounded-tl-xl rounded-bl-xl">
        <div class="">
            <div class="flex justify-between items-center mb-4">
                <a href="/" class="text-xl font-bold text-white hover:text-gray-300">Home</a>
                <button @click="open = !open">
                    <svg class="w-10 h-10 text-white hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>
            </div>
            <ul class="text-white text-lg ml-4 flex flex-col gap-y-1">
                <li>
                    <a class=" hover:text-gray-300" href="{{route('projects')}}">Projects</a>
                </li>
                <li>
                    <a class=" hover:text-gray-300" href="{{route('experience')}}">Work Experience</a>
                </li>
                <li>
                    <a class=" hover:text-gray-300" href="{{route('gallery')}}">Gallery</a>
                </li>
                <li>
                    <a class=" hover:text-gray-300" href="">Merchandise</a>
                </li>
                {{-- <li>
                    <a class=" hover:text-gray-300" href="/test">test</a>
                </li> --}}
            </ul>
        </div>
        <div class="text-white flex flex-col gap-1">
            @php
                $currentLanguage = session('language', 'en'); // Default to 'en' if no language is set
            @endphp
            <label class="cursor-pointer">
                <input type="radio" class="peer sr-only" name="HERE" value="HERE" @checked($currentLanguage == 'en')/>
                <div
                    class="flex justify-start items-center rounded-lg px-2 py-2 transition-all
            peer-checked:bg-gray-800 hover:bg-gray-800">
                    <svg aria-hidden="true" class="h-6 w-6 rounded-full me-2" xmlns="http://www.w3.org/2000/svg"
                        id="flag-icon-css-us" viewBox="0 0 512 512">
                        <g fill-rule="evenodd">
                            <g stroke-width="1pt">
                                <path fill="#bd3d44"
                                    d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                    transform="scale(3.9385)" />
                                <path fill="#fff"
                                    d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                    transform="scale(3.9385)" />
                            </g>
                            <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                            <path fill="#fff"
                                d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3z"
                                transform="scale(3.9385)" />
                        </g>
                    </svg>
                    English
                </div>
            </label>
            <label class="cursor-pointer">
                <input type="radio" class="peer sr-only" name="HERE" value="HERE" @checked($currentLanguage == 'id')/>
                <div
                    class="flex justify-start items-center rounded-lg px-2 py-2 transition-all
            peer-checked:bg-gray-800 hover:bg-gray-800">
                    <svg aria-hidden="true" class="h-6 w-6 rounded-full me-2" xmlns="http://www.w3.org/2000/svg"
                        id="flag-icon-css-id" viewBox="0 0 512 512">
                        <g fill-rule="evenodd" stroke-width="1pt">
                            <path fill="#fff" d="M0 0h512v512H0z" />
                            <path fill="#ce1126" d="M0 0h512v256H0z" />
                        </g>
                    </svg>
                    Bahasa Indonesia
                </div>
            </label>
            <label class="cursor-pointer">
                <input type="radio" class="peer sr-only" name="HERE" value="HERE" @checked($currentLanguage == 'jp')/>
                <div
                    class="flex justify-start items-center rounded-lg px-2 py-2 transition-all
            peer-checked:bg-gray-800 hover:bg-gray-800">
                    <svg aria-hidden="true" class="h-6 w-6 rounded-full me-2" xmlns="http://www.w3.org/2000/svg"
                        id="flag-icon-css-jp" viewBox="0 0 512 512">
                        <g fill-rule="evenodd" stroke-width="1pt">
                            <path fill="#fff" d="M0 0h512v512H0z" />
                            <path fill="#d52b1e" d="M362.7 256a106.7 106.7 0 1 1-213.4 0 106.7 106.7 0 0 1 213.4 0z" />
                        </g>
                    </svg>
                    日本語
                </div>
            </label>

        </div>
    </div>
</nav>

{{-- <script>
document.addEventListener('click', function(event) {
    var panel = document.querySelector('[x-ref="panel"]');
    if (panel && !panel.contains(event.target)) {
        panel.__x.$data.open = false;
    }
});
</script> --}}
