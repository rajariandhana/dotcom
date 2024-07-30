<!DOCTYPE html>
<html lang="en" class="h-full bg-gray-100">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    @vite(['resources/css/app.css', 'resources/sass/app.scss', 'resources/js/app.js'])
    {{-- @vite(['resources/css/app.css','resources/js/app.js']) --}}
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @livewireStyles
</head>

{{-- <body class="h-full bg-red-100 bg-gray-50 md:bg-green-100 lg:bg-blue-100"> --}}

<body class="h-full min-h-full bg-gray-100">
    <x-navbar></x-navbar>
    <main>
        <div class="flex flex-col justify-center px-6 py-6 mx-auto max-w-3xl sm:px-6 lg:px-8">
            {{ $slot }}
        </div>
    </main>
    <x-footer></x-footer>
    @livewireScripts
</body>

</html>
