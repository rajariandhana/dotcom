<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CVController extends Controller
{
    public function index()
    {
        $companiesArray = [
            [
                'name' => 'Institut Teknologi Sepuluh Nopember',
                'positions' => [
                    [
                        'name' => 'Data Structures Teaching Assistant',
                        'description' => 'lorem ipsum',
                        'start' => 'February 2024',
                        'end' => 'July 2024',
                    ],
                    [
                        'name' => 'Research Assistant',
                        'description' => 'lorem ipsum',
                        'start' => 'December 2023',
                        'end' => 'now',
                    ],
                    [
                        'name' => 'Basic Programming Teaching Assistant',
                        'description' => 'lorem ipsum',
                        'start' => 'August 2023',
                        'end' => 'December 2023',
                    ],
                ],
            ],
            [
                'name' => 'Schematics ITS',
                'positions' => [
                    [
                        'name' => 'Expert Game Developer',
                        'description' => 'lorem ipsum',
                        'start' => 'January 2024',
                        'end' => 'now',
                    ],
                    [
                        'name' => 'Game Developer',
                        'description' => 'lorem ipsum',
                        'start' => 'February 2023',
                        'end' => 'November 2023',
                    ],
                ],
            ],
        ];
        $companies = json_decode(json_encode($companiesArray));
        return view('cv', compact('companies'));
    }
    // public function GetCompanies(){

    //     return $companies;
    // }
}
