<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- @vite(['resources/css/app.css','resources/js/app.js']) --}}
    <link rel="stylesheet" href="build/assets/app-CMjH8Eu4.css">
    <title>CV</title>
    <style>
        body{
            background-size: 0 0;
            font-family: 'Times New Roman', Times, serif
            /* background-image: */
            /* radial-gradient(circle, white 0px, rgba(0, 0, 0, 0) 0px); */
        }
    </style>
</head>
<body class="flex flex-col w-full p-8 text-justify">
    <div class="items-center mb-12 text-center">
        <h1 class="font-bold">Ralfazza Rajariandhana</h1>
        <p>Indonesia</p>
        <p class="mb-8">
            <a class="underline" href="mailto:rajariandhana@gmail.com">rajariandhana@gmail.com</a> |
            <a class="underline" href="https://www.linkedin.com/in/rajariandhana">linkedin.com/in/rajariandhana</a> |
            <a class="underline" href="https://www.ralfazza.com">ralfazza.com</a>
        </p>
        <p class="text-justify">
            Passionate to keep learning about software development. Took pride in educating students on the fundamentals of programming as well as data structures. Enjoy developing games and web applications for side projects.
        </p>
    </div>
    <div class="">
        <h2 class="font-bold uppercase">Experience</h2>
        <hr class="h-[2px] bg-black mb-4">
        @foreach ($employers as $employer)
            <div class="mb-4">
                <h3 class="mb-2 font-bold uppercase">{{$employer->name}}</h3>
                @foreach ($employer->positions as $position)
                    <div class="mb-2 ml-8">
                        <h4 class="font-bold">{{$position->name}}</h4>
                        <span class="text-sm text-zinc-500">{{$position->date}}</span>
                        <p>{{$position->description}}</p>
                    </div>
                @endforeach
            </div>
        @endforeach
    </div>
</body>
</html>