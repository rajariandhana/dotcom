<x-layout>
    <x-infinite-scroll :data="$general">

    </x-infinite-scroll>
    <x-infinite-scroll :data="$web">

    </x-infinite-scroll>
    <x-infinite-scroll :data="$tools">

    </x-infinite-scroll>

    {{-- <div class="bg-white rounded-xl w-40 shadow-md px-2 py-2">
        <div class="bg-gray-200 w-36 h-48 rounded-md mb-2"></div>
        <h2 class="text-center">LOREM IPSUm</h2>
    </div> --}}
    {{-- <div class="p-4 bg-white rounded-3xl">
        <div x-data="{}" x-init="$nextTick(() => {
            let ul = $refs.logos;
            ul.insertAdjacentHTML('afterend', ul.outerHTML);
            ul.nextSibling.setAttribute('aria-hidden', 'true');
        })"
            class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul x-ref="logos"
                class="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll-10-LR">
                <li>
                    <img src="/tech-logo/html5-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/css3-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/javascript-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/php-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/tailwindcss-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/alpinejs-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/laravel-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/livewire-original.svg" alt="" class="h-12" />
                </li>

            </ul>
        </div>
    </div> --}}

</x-layout>
