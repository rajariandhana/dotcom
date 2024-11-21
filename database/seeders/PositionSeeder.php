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
            'date'=>'August 2024 - Present',
            'currentlyWorking'=>true,
            // 'mulai'=>'August 2023',
            // 'selesai'=>'December 2023',
        ]);
        Position::create([
            'name'=>'Fundamental Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students basic programming using C programming language up until simple sorting and searching algorithms. Creates programming problems for quizzes and lab works. Assist the lecturer in grading students.',
            'skills'=>'Teaching|Programming|C/C++',
            'date'=>'August 2024 - Present',
            'currentlyWorking'=>true,
            // 'mulai'=>'August 2023',
            // 'selesai'=>'December 2023',
        ]);
        Position::create([
            'name'=>'Data Structures Teaching Assistant',
            // 'slug'=>'Data_Structures_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students data structures and algorithms using C/C++. Creates programming problems for quizzes and lab works. Assist lecturers in grading students.',
            'skills'=>'Teaching|Data Structures|Algorithms|C/C++',
            'date'=>'February 2024 - July 2024',
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
            'date'=>'December 2023 - May 2024',
            'currentlyWorking'=>false,
            // 'mulai'=>'December 2023',
            // 'selesai'=>'Present',
        ]);
        Position::create([
            'name'=>'Fundamental Programming Teaching Assistant',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>1,
            'description'=>'Teaches international students basic programming using C programming language up until simple sorting and searching algorithms. Creates programming problems for quizzes and lab works. Assist the lecturer in grading students.',
            'skills'=>'Teaching|Programming|C/C++',
            'date'=>'August 2023 - December 2023',
            'currentlyWorking'=>false,
            // 'mulai'=>'August 2023',
            // 'selesai'=>'December 2023',
        ]);

        Position::create([
            'name'=>'Frontend Web Developer',
            // 'slug'=>'Basic_Programming_Teaching_Assistant',
            'employer_id'=>2,
            'description'=>'Design and create responsive frontend of a company profile. TailwindCSS and Alpinejs were used.',
            'skills'=>'Web|Programming',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
            // 'mulai'=>'August 2023',
            // 'selesai'=>'December 2023',
        ]);



        Position::create([
            'name'=>'Expert Game Developer',
            // 'slug'=>'Expert_Game_Developer',
            'employer_id'=>3,
            'description'=>'Design and develop games from ground up using C# with Unity Engine to be used in the Schematics 2024.',
            'skills'=>'Unity|C#|Figma|Game Design|OOP',
            'date'=>'January 2024 - November 2024',
            'currentlyWorking'=>false,
            // 'mulai'=>'January 2024',
            // 'selesai'=>'Present',
        ]);
        Position::create([
            'name'=>'Guest Speaker',
            'employer_id'=>3,
            'description'=>'Speaker for "Road To NPC" by Schematics NPC 2024. Teaches fundamental programming towards participants using C++ to prepare them for Schematics NPC 2024.',
            'skills'=>'Public Speaking|C++|Teaching',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Liaison Officer',
            'employer_id'=>3,
            'description'=>'Helped Schematics BST 2024 bootcamp participants by providing answers to questions regarding front-end web development in HTML, CSS, and JavaScript.',
            'skills'=>'HTML|CSS|JavaScript',
            'date'=>'July 2024 - August 2024',
            'currentlyWorking'=>false,
        ]);
        Position::create([
            'name'=>'Game Developer',
            // 'slug'=>'Game_Developer',
            'employer_id'=>3,
            'description'=>'Worked in a team to develop games using C# with Unity Engine for Schematics 2023. The games were played by over 1000 participants in the elimination round.',
            'skills'=>'Unity|C#|Figma',
            'date'=>'February 2023 - November 2023',
            'currentlyWorking'=>false,
            // 'mulai'=>'February 2023',
            // 'selesai'=>'November 2023',
        ]);


        
        Position::create([
            'name'=>'Practicum Coordinator',
            'employer_id'=>4,
            'description'=>'Responsible for all teaching assistants of Fundamental Programming Course, arranged the course\'s timeline, sets up website to held programming practicum.',
            'skills'=>'Coordinator',
            'date'=>'August 2024 - Present',
            'currentlyWorking'=>true,
        ]);
        Position::create([
            'name'=>'Lab Administrator',
            // 'slug'=>'Lab_Administrator',
            'employer_id'=>4,
            'description'=>'Administrator for ITS Informatics Engineering\'s Algorithms and Programming Laboratory. Co-Coordinator for the Data Structures course.',
            'skills'=>'Coordinator',
            'date'=>'January 2024 - Present',
            'currentlyWorking'=>true,
            // 'mulai'=>'January 2024',
            // 'selesai'=>'Present',
        ]);



        Position::create([
            'name'=>'Student Council',
            // 'slug'=>'Lab_Administrator',
            'employer_id'=>5,
            'description'=>'Worked in Public Relations Division. Specialized in documentation and information broadcast.',
            'skills'=>'Photography|Videography|Live Streaming',
            'date'=>'October 2019 - January 2022',
            'currentlyWorking'=>false,
            // 'mulai'=>'January 2024',
            // 'selesai'=>'Present',
        ]);
    }
}
