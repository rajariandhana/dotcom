<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;
    protected $fillable = ['name','employer_id','description','skills','date','currentlyWorking'];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }
}
