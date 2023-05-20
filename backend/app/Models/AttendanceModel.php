<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'status',
    ];

    protected $table = 'attendances';

    public function patient()
    {
        return $this->belongsTo(PatientModel::class);
    }
}
