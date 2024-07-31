<?php

use App\Http\Controllers\CVController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');
Route::get('/test', function () {
    return view('test');
});
Route::get('/cv', [CVController::class,'index'])->name('cv');
