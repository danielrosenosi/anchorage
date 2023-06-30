<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function lastAttendance(): HasOne
    {
        return $this->hasOne(AttendanceModel::class, 'patient_id', 'id')->latest();
    }

    public function allAttendances(): HasMany
    {
        return $this->hasMany(AttendanceModel::class, 'patient_id', 'id');
    }
}
