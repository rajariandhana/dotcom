<?php

namespace App\Livewire;

use App\Models\Photo;
use Illuminate\Support\Facades\File;
use Livewire\Component;

class PhotoFilter extends Component
{
    public $years=[];
    public $cities=[];

    public $selectedYears=[];
    public $selectedCities=[];
    public $images=[];

    public $bigPhoto;

    public string $message;

    public function view($path){
        $this->bigPhoto = $path;
    }
    public function mount(){
        $this->years=['2024','2023','2022','2020'];
        $this->cities=['Jakarta','Bali','Prigen','Tokyo'];
        $this->filter();
    }
    public function filter(){
        // dump($this->selectedYears);
        // dump($this->selectedCities);
        $folders = [
            '2024_Prigen',
            '2023_Tokyo',
            '2023_Jakarta',
            '2022_Jakarta',
            '2022_Bali',
            '2020_Jakarta',
        ];
        $this->images=[];
        foreach($folders as $folder){
            [$year,$city] = explode('_',$folder);
            if (!empty($this->selectedYears) && !in_array($year, $this->selectedYears)) {
                continue;
            }

            if (!empty($this->selectedCities) && !in_array($city, $this->selectedCities)) {
                continue;
            }

            $path = public_path($folder);
            if (File::exists($path) && File::isDirectory($path)) {
                $files = File::files($path);
                foreach ($files as $file) {
                    $extension = $file->getExtension();
                    if (in_array($extension, ['jpeg', 'jpg', 'png','JPEG','JPG','PNG'])) {
                        $this->images[$folder][] = asset($folder . '/' . $file->getFilename());
                    }
                }
            }
        }
        $this->message = empty($this->images)? "sorry, no photos match the filter" : 'EMPTY';
    }

    public function render()
    {
        return view('livewire.photo-filter');
    }
}
