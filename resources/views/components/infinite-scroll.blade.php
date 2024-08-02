{{-- <div class="p-4 bg-{{$data['bg']}} rounded-3xl my-2">
    <div x-data="{}" x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
        class="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
        <ul x-ref="logos"
            class="flex items-center justify-center md:justify-start [&_li]:mx-{{$data['mx']}} [&_img]:max-w-none animate-infinite-scroll-{{$data['timeDir']}}">
            @foreach ($data['files'] as $file)
            <li>
                <img src="{{$data['path']}}{{$file}}{{$data['extension']}}"
                alt="{{$data['path']}}{{$file}}{{$data['extension']}}"
                class="h-{{$data['h']}}" />
            </li>
            @endforeach
        </ul>
    </div>
</div> --}}
<div class="bg-red-50 relative flex overflow-x-hidden gap-8">
    <div class="py-6 flex animate-marquee whitespace-nowrap gap-8">
        @foreach ($data['files'] as $file)
                <img src="{{ $data['path'] }}{{ $file }}{{ $data['extension']}}"
                    alt="{{ $data['path'] }}{{ $file }}{{ $data['extension']}}"
                    class="h-{{$data['h']}}">
        @endforeach
    </div>
    <div class="absolute top-0 py-6 flex animate-marquee2 whitespace-nowrap gap-8">
        @foreach ($data['files'] as $file)
            <img src="{{ $data['path'] }}{{ $file }}{{ $data['extension']}}"
                alt="{{ $data['path'] }}{{ $file }}{{ $data['extension']}}"
                class="h-{{$data['h']}}">
        @endforeach

    </div>
</div>
