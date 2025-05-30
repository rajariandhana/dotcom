<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Project::create([
        //     'name' => '',
        //     'slug' => '',
        //     'techs' => '||',
        //     'desc' => '',
        //     'numPhoto' => 1,
        //     'extension' => 'png',
        //     'repo' => 'github.com/rajariandhana/',
        //     'demo' => '.ralfazza.com',
        //     'size'=>'BOX-SM',
        // ]);
        /*
            escape cube 2024
        */
        Project::create([
            'name' => 'SIMPENAN | Sistem Informasi Media Penting dan Aman',
            'slug' => 'simpenan',
            'techs' => 'Tailwindcss|Alpine.js|Laravel|Livewire',
            'desc' => 'For my Information Security course, we are required to implement a symmetric and asymmetric encryption for users to store files and send encrypted files',
            'numPhoto' => 1,
            'extension' => 'png',
            'repo' => 'github.com/NETICS-Laboratory/symmetric-data-encryption-application-simpenan',
            'demo' => 'simpenan.ralfazza.com',
            'size'=>'WIDE',
        ]);
        Project::create([
            'name' => 'Alpro x Three.js',
            'slug' => 'alpro-x-three',
            'techs' => 'JavaScript|Three.js|',
            'desc' => 'For Computer Graphics course final project, we created a 3d render of the Algorithms and Programming Laboratory using Three.js.',
            'numPhoto' => 1,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/ComputerGraphicsFP',
            // 'demo' => '.ralfazza.com',
            'size'=>'WIDE',
        ]);
        Project::create([
            'name' => 'GOOFYAH | Goal Organizer For You At Hand',
            'slug' => 'goofyah',
            'techs' => 'GO|Gin|Tailwindcss|Alpine.js',
            'desc' => 'Canon event to do app. For my Framework Based Programming course that uses gin gonic framework.',
            'numPhoto' => 2,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/goofyah',
            // 'demo' => '.ralfazza.com',
            'size'=>'TALL',
        ]);

        Project::create([
            'name' => 'SIKMA | Sistem Informasi Kesehatan Mahasiswa',
            'slug' => 'sikma',
            'techs' => 'Tailwindcss|Alpine.js|Laravel|Livewire',
            'desc' => 'For my Framework Based Programming course that uses laravel framework.',
            'numPhoto' => 2,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/sikma',
            'demo' => 'sikma.ralfazza.com',
            'size'=>'TALL',
        ]);
        Project::create([
            'name' => 'Boombatag',
            'slug' => 'boombatag-2024',
            'techs' => 'Unity|C#|Figma',
            'desc' => 'Used for Schematics ITS 2024, the game is inspired from the infamous "Keep Talking and Nobody Explodes"',
            'numPhoto' => 1,
            'extension' => 'png',
            // 'repo' => 'github.com/rajariandhana/',
            // 'demo' => '.ralfazza.com',
            'size'=>'BOX-LG',
        ]);
        // Project::create([
        //     'name' => '',
        //     'slug' => '',
        //     'techs' => '||',
        //     'desc' => '',
        //     'numPhoto' => 1,
        //     'extension' => 'png',
        //     'repo' => 'github.com/rajariandhana/',
        //     'demo' => '.ralfazza.com',
        //     'size'=>'',
        // ]);


        Project::create([
            'name' => 'Minesweeper',
            'slug' => 'minesweeper',
            'techs' => 'HTML|CSS|JavaScript',
            'desc' => 'For my Design & Analysis of Algorithms course, I chose to create a game of minesweeper which applies the Breadth First Search algorithm when revealing cells that does not have a mine in it. Kind of proud of this one since I already know the basic and just needed a bit help from GPT for minor syntax stuffs.',
            'numPhoto' => 3,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/minesweeper',
            'demo' => 'minesweeper.ralfazza.com',
            'size'=>'BOX-SM',
        ]);
        Project::create([
            'name' => 'Checkers',
            'slug' => 'checkers',
            'techs' => 'Unity|C#',
            'desc' => 'Just a replication of a checkers game. Unfortunately it is a bit difficult to put it on the web so I am sorry about the aspect ratio',
            'numPhoto' => 2,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/dev_checkers',
            'demo' => 'checkers.ralfazza.com',
            'size'=>'BOX-SM',
        ]);

        Project::create([
            'name' => 'FoodGrub',
            'slug' => 'foodgrub',
            'techs' => 'PHP|Laravel|MySQL',
            'desc' => 'Simple point of Sales application for F&B business. Business owner can perform CRUD to menus, create and track order, as well as to filter order based on dates.',
            'numPhoto' => 4,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/fpcamin',
            'demo' => 'foodgrub.ralfazza.com',
            'size'=>'BOX-LG',
        ]);

        Project::create([
            'name' => 'Boombatag',
            'slug' => 'boombatag-2023',
            'techs' => 'Unity|C#|Figma',
            'desc' => 'Used for Schematics ITS 2023, the game is inspired from the infamous "Keep Talking and Nobody Explodes"',
            'numPhoto' => 4,
            'extension' => 'JPG',
            'repo' => '',
            'size'=>'WIDE',
        ]);
        Project::create([
            'name' => 'Escape Card',
            'slug' => 'escape-card',
            'techs' => 'Unity|C#|Figma',
            'desc' => 'Online game played by over 1000 people that is used for Schematics ITS 2023. Players must gather clues and solve logic puzzles to find the treasure.',
            'numPhoto' => 3,
            'extension' => 'JPG',
            'repo' => '',
            'size'=>'WIDE',
        ]);

        Project::create([
            'name' => 'StudyKanji',
            'slug' => 'studykanji',
            'techs' => 'HTML|CSS|JavaScript',
            'desc' => 'Personal project to help me and my friends learn Japanese Kanji. Not optimized for desktop',
            'numPhoto' => 3,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/kanji',
            'demo' => 'studykanji.ralfazza.com',
            'size'=>'TALL',
        ]);

        Project::create([
            'name' => 'Postitivity',
            'slug' => 'postitivity',
            'techs' => 'HTML|CSS|JavaScript|PHP|MySQL',
            'desc' => 'Created a "post it" themed social media for Web Programming class that utilizes relational database.',
            'numPhoto' => 3,
            'extension' => 'JPG',
            'repo' => '',
            'demo' => 'postitivity.000webhostapp.com/',
            'size'=>'BOX-LG',
        ]);

        Project::create([
            'name' => 'ServiceHub',
            'slug' => 'servicehub',
            'techs' => 'Software Development|Figma',
            'desc' => 'Created a prototype for a home service provider for Concept of Software Development class.',
            'numPhoto' => 4,
            'extension' => 'JPG',
            'demo' => 'www.figma.com/proto/TQB7eNQb8QwwgKid9RwAT0/ServiceHub?node-id=1-3&starting-point-node-id=1%3A3&mode=design&t=EcjVJJ0KtK4EcMot-1',
            'size'=>'TALL',
        ]);
    }
}
