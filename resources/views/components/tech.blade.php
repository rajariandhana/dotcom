<div class="w-full items-center flex flex-col gap-4">
    <div class="p-4 bg-gray-200 shadow-md rounded-3xl w-full lg:w-3/4">
        <div x-data="{}" x-init="$nextTick(() => {
            let ul = $refs.logos;
            ul.insertAdjacentHTML('afterend', ul.outerHTML);
            ul.nextSibling.setAttribute('aria-hidden', 'true');
        })"
            class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
            <ul x-ref="logos"
                class="flex items-center justify-center md:justify-start [&_li]:mx-4 lg:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-10-RL">
                <li>
                    <img src="/tech-logo/c-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/cplusplus-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/csharp-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/python-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/java-original.svg" alt="" class="h-12" />
                </li>

            </ul>
        </div>
    </div>
    <div class="p-4 bg-gray-200 shadow-md rounded-3xl w-full lg:w-3/4">
        <div x-data="{}" x-init="$nextTick(() => {
            let ul = $refs.logos;
            ul.insertAdjacentHTML('afterend', ul.outerHTML);
            ul.nextSibling.setAttribute('aria-hidden', 'true');
        })"
            class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
            <ul x-ref="logos"
                class="flex items-center justify-center md:justify-start [&_li]:mx-2 lg:[&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll-20-LR">
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
                    <img src="/tech-logo/bootstrap-original.svg" alt="" class="h-12" />
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
    </div>
    <div class="p-4 bg-gray-200 shadow-md rounded-3xl w-full lg:w-3/4">
        <div x-data="{}" x-init="$nextTick(() => {
            let ul = $refs.logos;
            ul.insertAdjacentHTML('afterend', ul.outerHTML);
            ul.nextSibling.setAttribute('aria-hidden', 'true');
        })"
            class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
            <ul x-ref="logos"
                class="flex items-center justify-center md:justify-start [&_li]:mx-4 lg:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-10-RL">
                <li>
                    <img src="/tech-logo/vscode-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/unity-original.svg" alt="" class="h-12" />
                </li>
                <li>
                    <img src="/tech-logo/docker-original.svg" alt="" class="h-12" />
                </li>
                {{-- <li>
                    <img src="/tech-logo/figma-original.svg" alt="" class="h-12" />
                </li> --}}
                <li>
                    <img src="/tech-logo/mysql-original.svg" alt="" class="h-12" />
                </li>
                {{-- <li>
                    <img src="/tech-logo/sqlite-original.svg" alt="" class="h-12" />
                </li> --}}
                <li>
                    <img src="/tech-logo/postgresql-original.svg" alt="" class="h-12" />
                </li>
            </ul>
        </div>
    </div>
</div>
