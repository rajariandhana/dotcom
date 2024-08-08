<?php

namespace App\Livewire;

use Livewire\Component;

class BestShots extends Component
{
    public $bigPhoto;
    public $files =[];
    public function view($path){
        $this->bigPhoto = $path;
    }
    public function mount(){
        $this->files = [
            'Gallery/IMG_9509.JPG',
            'Gallery/IMG_9525.JPG',
            'Gallery/IMG_9652.JPG',
        ];
    }

    public function render()
    {
        return view('livewire.best-shots');
    }
}
