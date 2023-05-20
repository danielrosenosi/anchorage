<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'birthdate',
        'cpf',
        'phone',
        'image',
    ];

    protected $casts = [
        'birthdate' => 'date',
    ];

    protected $table = 'patients';

    public function attendances()
    {
        return $this->hasMany(AttendanceModel::class, 'patient_id', 'id');
    }
}
