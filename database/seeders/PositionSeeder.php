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
            'name'=>'Algorithms and Computer Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches Industrial Engineering students fundamental programming using C programming language and later on using Python up until simple sorting and searching algorithms. Assist the lecturer in grading students.',
            'skills'=>'Teaching|Programming|C|Python',
            'date'=>'August 2024 - December 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Fundamental Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students fundamental programming using C programming language up until simple sorting and searching algorithms. Creates programming problems for quizzes and lab works. Assist the lecturer in grading students.',
            'skills'=>'Teaching|Programming|C/C++',
            'date'=>'August 2024 - December 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Data Structures Teaching Assistant',
            // 'slug'=>'Data_Structures_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students data structures and algorithms using C/C++. Creates programming problems for quizzes and lab works. Assist lecturers in grading students.',
            'skills'=>'Teaching|Data Structures|Algorithms|C/C++',
            'date'=>'February 2024 - July 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Research Assistant',
            // 'slug'=>'Research_Assistant',
            'employer_id'=>1,
            'description'=>'Aide the lecturer\'s research by creating python scripts to analyze data.',
            'skills'=>'Python|Matplotlib|Pandas',
            'date'=>'December 2023 - May 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Fundamental Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students fundamental programming using C programming language up until simple sorting and searching algorithms. Creates programming problems for quizzes and lab works. Assist the lecturer in grading students.',
            'skills'=>'Teaching|Programming|C/C++',
            'date'=>'August 2023 - December 2023',
            'currentlyWorking'=>false,
        ]);



        Position::create([
            'name'=>'Frontend Web Developer',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>2,
            'description'=>'Developed and designed the responsive frontend for the company\'s profile website, ensuring a seamless user experience across all devices.',
            'skills'=>'Web|Tailwind CSS| Alpine.js',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
        ]);



        Position::create([
            'name'=>'Expert Game Developer',
            // 'slug'=>'Expert_Game_Developer',
            'employer_id'=>3,
            'description'=>'Design and develop games from scratch using C# with Unity Engine to be used in the Schematics 2024 reaching over 1000 players online. Focused on creating the core inventory system and item pick-up mechanism for the first game and led development on user interfaces for second game.',
            'skills'=>'Unity|C#|Figma|Game Design|OOP',
            'date'=>'January 2024 - November 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Guest Speaker',
            'employer_id'=>3,
            'description'=>'Speaker for "Road To NPC" by Schematics NPC 2024. Teaches fundamental programming towards participants using C++ to prepare the competition.',
            'skills'=>'Public Speaking|C++|Teaching',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Liaison Officer',
            'employer_id'=>3,
            'description'=>'Provided guidance and support to participants of Schematics BST 2024 bootcamp, offering answers and insights on front-end web development with HTML, CSS, and JavaScript.',
            'skills'=>'HTML|CSS|JavaScript',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Game Developer',
            // 'slug'=>'Game_Developer',
            'employer_id'=>3,
            'description'=>'Collaborated in a team to develop games using C# with Unity Engine for Schematics 2023. Games were played by over 1000 participants in the elimination round.',
            'skills'=>'Unity|C#|Figma',
            'date'=>'February 2023 - November 2023',
            'currentlyWorking'=>false,
        ]);



        Position::create([
            'name'=>'Practicum Coordinator',
            'employer_id'=>4,
            'description'=>'Responsible for all teaching assistants of Fundamental Programming Course, arranged the course\'s timeline, sets up website to held programming practicum.',
            'skills'=>'Coordinator',
            'date'=>'August 2024 - December 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Lab Administrator',
            // 'slug'=>'Lab_Administrator',
            'employer_id'=>4,
            'description'=>'Administrator for ITS Informatics Engineering\'s Algorithms and Programming Laboratory. Co-Coordinator for the Data Structures course.',
            'skills'=>'Coordinator',
            'date'=>'January 2024 - Present',
            'currentlyWorking'=>true,
        ]);



        Position::create([
            'name'=>'Student Council',
            // 'slug'=>'Lab_Administrator',
            'employer_id'=>5,
            'description'=>'Worked in Public Relations Division. Specialized in documentation and information broadcast.',
            'skills'=>'Photography|Videography|Live Streaming',
            'date'=>'October 2019 - January 2022',
            'currentlyWorking'=>false,
        ]);
    }
}
