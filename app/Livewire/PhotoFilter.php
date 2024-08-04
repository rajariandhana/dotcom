<?php

namespace App\Livewire;

use App\Models\Photo;
use Livewire\Component;

class PhotoFilter extends Component
{
    public $selectedCities=[];
    public $selectedYears=[];
    public function filtering(){
        $this->render();
    }
    public function render()
    {
        $photos = Photo::query()
            ->when($this->selectedCities, function($query){
                $query->whereIn('city',$this->selectedCities);
            })
            ->when($this->selectedYears, function($query){
                $query->whereIn('year',$this->selectedYears);
            })
            ->get();

            $cities = Photo::select('city')->distinct()->pluck('city');
            $years = Photo::select('year')->distinct()->pluck('year');
        return view('livewire.photo-filter',[
            'photos'=>$photos,
            'cities'=>$cities,
            'years'=>$years,
        ]);
    }

    // public function updatedSelectedCities()
    // {
    //     $this->render();
    // }

    // public function updatedSelectedYears()
    // {
    //     $this->render();
    // }
}
