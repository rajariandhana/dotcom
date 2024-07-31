<x-layout>
    @foreach ($companies as $company)
    <div>
        <div>
            <img src="" alt="">
            <h2 class="text-lg font-semibold">{{ $company->name }}</h2>
        </div>
        <ol class="relative border-s border-gray-900 ">
            @foreach ($company->positions as $position)
                <li class="mb-10 ms-4">
                    <div class="absolute w-3 h-3 bg-gray-50 rounded-full mt-1.5 -start-1.5 border border-gray-900 ">
                    </div>
                    <time class="mb-1 text-sm font-normal leading-none text-gray-500 ">{{ $position->start }} -
                        {{ $position->end }}</time>
                    <h3 class="text-lg font-semibold text-gray-900 ">{{ $position->name }}</h3>
                    <p class="mb-4 text-base font-normal text-gray-500 ">{{ $position->description }}</p>
                    {{-- <a href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700">Learn
                    more <svg class="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg></a> --}}
                </li>
            @endforeach
        </ol>
    </div>
    @endforeach


</x-layout>
