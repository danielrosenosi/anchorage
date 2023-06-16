<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttendanceModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'status',
        'symptoms',
        'temperature',
        'systolic_blood_pressure',
        'diastolic_blood_pressure',
        'respiratory_frequency',
    ];

    protected $casts = [
        'symptoms' => 'array',
    ];

    protected $table = 'attendances';

    public function patient(): BelongsTo
    {
        return $this->belongsTo(PatientModel::class);
    }

    public static function getStatus(array $symptoms): int
    {
        $symptomsCount = count($symptoms);

        if($symptomsCount > 1 && $symptomsCount <= 5) {
            return 1;
        } else if($symptomsCount >= 6 && $symptomsCount <= 8) {
            return 2;
        } else if($symptomsCount >= 9) {
            return 3;
        } else {
            return 0;
        }
    }
}
