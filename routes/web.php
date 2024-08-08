<?php

use App\Http\Controllers\CVController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ProjectController;
use App\Models\Photo;
use App\Models\Project;
// use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('home');
})->name('home');
Route::get('/experience', [CVController::class,'index'])->name('experience');
Route::get('/download-cv', function () {
    $filePath = public_path('/CV/CV_RalfazzaRajariandhana.pdf');
    $fileName = 'CV_RalfazzaRajariandhana.pdf';
    return response()->download($filePath, $fileName);
});
Route::get('/gallery', function () {
    return view('gallery',[
        'photos'=>Photo::all()
    ]);
})->name('gallery');
Route::get('/merchandise', function () {
    return view('merch');
})->name('merch');
Route::get('/socials', function () {
    return view('socials');
})->name('socials');
Route::get('/projects',[ProjectController::class,'index'])->name('projects');
Route::get('projects/{slug}', [ProjectController::class, 'show'])->name('project.show');

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
        'timeDir'=>'5-LR',
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
        'timeDir'=>'10-LR',
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
        'timeDir'=>'5-LR',
        'files'=>$toolsfile
    ];

    return view('test',[
        'web'=>$web,
        'general'=>$general,
        'tools'=>$tools,
    ]);
});

// Route::get('locale/{lang}',[LocaleController::class,'setLocale']);
Route::get('locale/{locale}',function(string $locale){
    if(! in_array($locale, ['en','id','jp'])){
        abort(400);
    }
    // App::setLocale($locale);
    // session()->put('locale',$locale);
    Session::put('locale',$locale);
    return redirect()->back();
});
