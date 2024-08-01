<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Position::create([
            'name'=>'Data Structures Teaching Assistant',
            // 'slug'=>'Data_Structures_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students data structures and algorithms using C/C++. Creates programming problems for quizzes and lab works. Assist lecturers in grading students.',
            'skills'=>'C/C++|Data Structures|Teaching',
            'date'=>'February 2024 - Present',
            'currentlyWorking'=>false,
            // 'mulai'=>'February 2024',
            // 'selesai'=>'Present',
        ]);
        Position::create([
            'name'=>'Research Assistant',
            // 'slug'=>'Research_Assistant',
            'employer_id'=>1,
            'description'=>'Aide the lecturer\'s research by creating python scripts to analyze data.',
            'skills'=>'Python|Matplotlib|Pandas|ScikitLearn',
            'date'=>'December 2023 - Present',
            'currentlyWorking'=>false,
            // 'mulai'=>'December 2023',
            // 'selesai'=>'Present',
        ]);
        Position::create([
            'name'=>'Basic Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students basic programming using C programming language up until simple sorting and searching algorithms. Creates programming problems for quizzes and lab works. Assist the lecturer in grading students.',
            'skills'=>'C/C++|Data Structures|Teaching',
            'date'=>'August 2023 - December 2023',
            'currentlyWorking'=>false,
            // 'mulai'=>'August 2023',
            // 'selesai'=>'December 2023',
        ]);

        Position::create([
            'name'=>'Expert Game Developer',
            // 'slug'=>'Expert_Game_Developer',
            'employer_id'=>2,
            'description'=>'Design and develop games from zero using C# with Unity Engine to be used in the Schematics 2024.',
            'skills'=>'Unity|C#|Figma|Design Thinking',
            'date'=>'January 2024 - Present',
            'currentlyWorking'=>false,
            // 'mulai'=>'January 2024',
            // 'selesai'=>'Present',
        ]);
        Position::create([
            'name'=>'Game Developer',
            // 'slug'=>'Game_Developer',
            'employer_id'=>2,
            'description'=>'Worked in a team to develop games using C# with Unity Engine for Schematics 2023. The games were played by over 1000 participants in the elimination round.',
            'skills'=>'Unity|C#|Figma',
            'date'=>'February 2023 - November 2023',
            'currentlyWorking'=>false,
            // 'mulai'=>'February 2023',
            // 'selesai'=>'November 2023',
        ]);

        Position::create([
            'name'=>'Lab Administrator',
            // 'slug'=>'Lab_Administrator',
            'employer_id'=>3,
            'description'=>'Administrator for ITS Informatics Engineering\'s Algorithms and Programming Laboratory. Vice Coordinator for the Data Structures course.',
            'skills'=>'Coordinator',
            'date'=>'January 2024 - Present',
            'currentlyWorking'=>false,
            // 'mulai'=>'January 2024',
            // 'selesai'=>'Present',
        ]);
    }
}
