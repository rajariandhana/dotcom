<!DOCTYPE html>
<html
lang="en"
{{-- lang="{{session('locale') }}" --}}
    {{-- class="h-full bg-gray-100" --}}
    >

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{$title}}</title>
    <link rel="shortcut icon" href="{{asset('favicon.png')}}">
    {{-- @vite(['resources/css/app.css', 'resources/sass/app.scss', 'resources/js/app.js']) --}}
    @vite(['resources/css/app.css','resources/js/app.js'])
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @livewireStyles
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="devicon.min.css">
</head>

{{-- <body class="h-full bg-red-100 bg-gray-50 md:bg-green-100 lg:bg-blue-100"> --}}

<body class="bg-gray-100 font-poppins">
    <x-navbar></x-navbar>
    <main>
        <div class="flex flex-col justify-center pt-24 px-6 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8 lg:mt-12
         {{-- bg-red-200 md:bg-green-200 lg:bg-blue-200 --}}
         ">
            {{ $slot }}
        </div>
    </main>
    <x-footer></x-footer>
    <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    @livewireScripts

</body>

</html>
