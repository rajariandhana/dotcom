<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
class CVController extends Controller
{
    public function index()
    {
        return view('cv',[
            'employers'=>Employer::all()
        ]);
    }
    // public function GetCompanies(){

    //     return $companies;
    // }
    public function GeneratePDF(){
        $employers = Employer::all();
        // dd($employers);
        $pdf = Pdf::loadView('cv-template', compact('employers'))
            ->setPaper('a4', 'portrait');
        return $pdf->download('CV_RalfazzaRajariandhana.pdf');
    }
    public function ViewPDF(){
        return view('cv-template',[
            'employers'=>Employer::all()
        ]);
    }
}
