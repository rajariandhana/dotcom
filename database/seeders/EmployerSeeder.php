<?php

namespace Database\Seeders;

use App\Models\Employer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employer::create([
            'name'=>'Sepuluh Nopember Institute of Technology',
            'slug'=>'ITS-Surabaya',
            'link'=>'https://www.its.ac.id',
            'description'=>'This is my campus, got here in 2022 to study Informatics Engineering. It\'s like one of the best educational institute in the country.',
        ]);
        Employer::create([
            'name'=>'PT Rajawali Holdings Indonesia',
            'slug'=>'PT-Rajawali-Holdings-Indonesia',
            'link'=>'https://www.rajawaliholdings.com',
            'description'=>'Internship here',
        ]);
        Employer::create([
            'name'=>'Schematics ITS',
            'slug'=>'Schematics-ITS',
            'link'=>'https://schematics-its.com',
            'description'=>'Where I learn game development. It\'s like an annual event, there is logic competition, programming competition, bootcamp and seminars, as well as the fun stuffs.',
        ]);
        Employer::create([
            'name'=>'Algorithms and Programming Laboratory',
            'slug'=>'Alpro-ITS',
            'link'=>'https://www.its.ac.id/informatika/id/fasilitas/laboratorium/laboratorium-algoritma-dan-pemrograman/',
            'description'=>'One of many Informatics Engineering Department\'s laboratorium.',
        ]);
        Employer::create([
            'name'=>'Al-Izhar Pondok Labu',
            'slug'=>'Al-Izhar',
            'link'=>'https://instagram.com/osis_smaipl',
            'description'=>'My beloved school',
        ]);

    }
}
