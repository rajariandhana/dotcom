<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;
    protected $fillable = ['name','link','description'];
    public function positions(){
        return $this->hasMany(Position::class);
    }
}
