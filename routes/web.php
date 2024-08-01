<?php

use App\Http\Controllers\CVController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');
Route::get('/test', function () {
    $generalfile=[
        "c-original","cplusplus-original","csharp-original",
        "python-original","java-original"
    ];
    $general=[
        'name'=>"general",
        'path'=> "/tech-logo/",
        'extension'=>".svg",
        'h'=>"12",
        'mx'=>"2",
        'bg'=>'gray-200',
        'time'=>'5',
        'dir'=>'RL',
        'files'=>$generalfile
    ];
    $webfile=[
        "html5-original","css3-original","javascript-original","php-original",
        "tailwindcss-original","alpinejs-original","laravel-original","livewire-original",
        "bootstrap-original",
    ];
    $web=[
        'name'=>"web",
        'path'=> "/tech-logo/",
        'extension'=>".svg",
        'h'=>"12",
        'mx'=>"2",
        'bg'=>'gray-200',
        'time'=>'10',
        'dir'=>'LR',
        'files'=>$webfile
    ];
    $toolsfile=[
        "vscode-original","github-original","docker-original",
        "figma-original","unity-original",
    ];
    $tools=[
        'name'=>"tools",
        'path'=> "/tech-logo/",
        'extension'=>".svg",
        'h'=>"12",
        'mx'=>"2",
        'bg'=>'gray-200',
        'time'=>'5',
        'dir'=>'RL',
        'files'=>$toolsfile
    ];

    return view('test',[
        'web'=>$web,
        'general'=>$general,
        'tools'=>$tools,
    ]);
});
Route::get('/cv', [CVController::class,'index'])->name('cv');
Route::get('/download-cv', function () {
    $filePath = public_path('/CV/CV_RalfazzaRajariandhana.pdf');
    $fileName = 'CV_RalfazzaRajariandhana.pdf';
    return response()->download($filePath, $fileName);
});
