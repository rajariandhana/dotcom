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
        Project::create([
            'name' => 'Minesweeper',
            'techs' => 'HTML | CSS | JavaScript',
            'desc' => 'For my Design & Analysis of Algorithms course, I chose to create a game of minesweeper which applies the Breadth First Search algorithm when revealing cells that does not have a mine in it. Kind of proud of this one since I already know the basic and just needed a bit help from GPT for minor syntax stuffs.',
            'numPhoto' => 3,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/minesweeper',
            'demo' => 'minesweeper.ralfazza.com',
            'size'=>'BOX-SM',
        ]);
        Project::create([
            'name' => 'Checkers',
            'techs' => 'Unity | C#',
            'desc' => 'Just a replication of a checkers game. Unfortunately it is a bit difficult to put it on the web so I am sorry about the aspect ratio',
            'numPhoto' => 2,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/dev_checkers',
            'demo' => 'checkers.ralfazza.com',
            'size'=>'BOX-SM',
        ]);

        Project::create([
            'name' => 'FoodGrub',
            'techs' => 'PHP | Laravel | MySQL',
            'desc' => 'Simple point of Sales application for F&B business. Business owner can perform CRUD to menus, create and track order, as well as to filter order based on dates.',
            'numPhoto' => 4,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/fpcamin',
            'demo' => 'foodgrub.ralfazza.com',
            'size'=>'BOX-LG',
        ]);

        Project::create([
            'name' => 'Boombatag',
            'techs' => 'Unity | C# | Figma',
            'desc' => 'Used for Schematics ITS 2023, the game is inspired from the infamous "Keep Talking and Nobody Explodes"',
            'numPhoto' => 4,
            'extension' => 'jpg',
            'repo' => '',
            'size'=>'WIDE',
        ]);
        Project::create([
            'name' => 'Escape Card',
            'techs' => 'Unity | C# | Figma',
            'desc' => 'Online game played by over 1000 people that is used for Schematics ITS 2023. Players must gather clues and solve logic puzzles to find the treasure.',
            'numPhoto' => 3,
            'extension' => 'jpg',
            'repo' => '',
            'size'=>'WIDE',
        ]);

        Project::create([
            'name' => 'StudyKanji',
            'techs' => 'HTML | CSS | JavaScript',
            'desc' => 'Personal project to help me and my friends learn Japanese Kanji. Not optimized for desktop',
            'numPhoto' => 3,
            'extension' => 'png',
            'repo' => 'github.com/rajariandhana/kanji',
            'demo' => 'ralfazza.com/kanji',
            'size'=>'TALL',
        ]);

        Project::create([
            'name' => 'Postitivity',
            'techs' => 'HTML | CSS | JavaScript | PHP | MySQL',
            'desc' => 'Created a "post it" themed social media for Web Programming class that utilizes relational database.',
            'numPhoto' => 3,
            'extension' => 'jpg',
            'repo' => '',
            'demo' => 'https://postitivity.000webhostapp.com/',
            'size'=>'TALL',
        ]);

        Project::create([
            'name' => 'ServiceHub',
            'techs' => 'Software Development | Figma',
            'desc' => 'Created a prototype for a home service provider for Concept of Software Development class.',
            'numPhoto' => 4,
            'extension' => 'jpg',
            'demo' => 'https://www.figma.com/proto/TQB7eNQb8QwwgKid9RwAT0/ServiceHub?node-id=1-3&starting-point-node-id=1%3A3&mode=design&t=EcjVJJ0KtK4EcMot-1',
            'size'=>'TALL',
        ]);
    }
}
