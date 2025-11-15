<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- @vite(['resources/css/app.css','resources/js/app.js']) --}}
    <link rel="stylesheet" href="build/assets/app-CRufSqCy.css">
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
<body class="flex flex-col p-8 text-justify">
    <div class="items-center mb-4 text-center">
        <h1 class="font-bold">Ralfazza Rajariandhana</h1>
        <p>Indonesia</p>
        <p class="mb-4">
            <a class="underline" href="mailto:rajariandhana@gmail.com">rajariandhana@gmail.com</a> |
            <a class="underline" href="https://www.linkedin.com/in/rajariandhana">linkedin.com/in/rajariandhana</a> |
            <a class="underline" href="https://www.ralfazza.com">ralfazza.com</a>
        </p>
        <p class="text-justify">
            Third year computer science student currently studying in Australia with hands-on experience in web development, game development, and teaching students.
        </p>
    </div>
    <div class="mb-4">
        <h2 class="font-bold uppercase">Education</h2>
        <hr class="h-[2px] bg-black mb-4">
        <div class="mb-4">
            <h3 class="font-bold uppercase">University of Queensland (UQ)</h3>
            <span class="text-sm text-zinc-500">February 2025 - Present</span>
            <p>Double degree student in partnership with ITS. Enrolled in Bachelor of Computer Science with Major in Cyber Security. Expected to graduate in July 2026.</p>
        </div>
        <div class="mb-4">
            <h3 class="font-bold uppercase">Sepuluh Nopember Institute of Technology (ITS)</h3>
            <span class="text-sm text-zinc-500">August 2022 - Present</span>
            <p>Enrolled in Informatics Engineering International Undergraduate Program. 3.51 GPA on a 4 scale system for 105 credits throughout 5 semesters. Expected to graduate in July 2026.</p>
        </div>
        <div class="mb-4">
            <h3 class="font-bold uppercase">Al-Izhar Pondok Labu</h3>
            <span class="text-sm text-zinc-500">July 2019 - May 2022</span>
            <p>Graduated from Math and Natural Science course. Member of Environmental Club (2019-2022) and Public Relations (2019-2022).</p>
        </div>
    </div>
    <div class="mb-4">
        <h2 class="font-bold uppercase">Experience</h2>
        <hr class="h-[2px] bg-black mb-4">
        @foreach ($employers as $employer)
            <div class="mb-4">
                <h3 class="mb-2 font-bold uppercase">{{$employer->name}}</h3>
                @foreach ($employer->positions as $position)
                    <div class="mb-2 ml-4">
                        <h4 class="font-bold">{{$position->name}}</h4>
                        <span class="text-sm text-zinc-500">{{$position->date}}</span>
                        <p>{{$position->description}}</p>
                    </div>
                @endforeach
            </div>
        @endforeach
    </div>
    <div class="mb-4">
        <h2 class="font-bold uppercase">Skills</h2>
        <hr class="h-[2px] bg-black mb-4">
        <div class="mb-4">
            <h3 class="font-bold uppercase">Tech Stack</h3>
            <ul class="ml-6 list-disc">
                <li>Data structures and algorithms using C/C++</li>
                <li>Web frameworks such as Laravel and Gin with help of Tailwind CSS, Alpine.js, Livewire</li>
                <li>Game development and object-oriented Programming using C# with Unity Engine</li>
                <li>Data analyzing using Python with pandas, matplotlib, numpy</li>
                <li>Database management using MySQL, SQLite, and PostgreSQL</li>
            </ul>
        </div>
        <div class="mb-4">
            <h3 class="font-bold uppercase">Languages</h3>
            <ul class="ml-6 list-disc">
                <li>Indonesian (Native speaker)</li>
                <li>English (Proficient, IELTS 7.0)</li>
            </ul>
        </div>
    </div>
</body>
</html>