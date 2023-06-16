<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttendanceRequest;
use App\Models\AttendanceModel;
use Illuminate\Http\JsonResponse;

class AttendanceController extends Controller
{
    public function show(int $patientId): JsonResponse
    {
        $attendance = AttendanceModel::where('patient_id', $patientId)->paginate(5);

        return response()->json($attendance);
    }

    public function store(int $patientId, AttendanceRequest $request): JsonResponse
    {
        $data = $request->validated();

        $attendance = AttendanceModel::create([
            'patient_id' => $patientId,
            'symptoms' => $data['symptoms'] ?? [],
            'status' => AttendanceModel::getStatus($data['symptoms'] ?? []),
            'temperature' => $data['temperature'],
            'systolic_blood_pressure' => $data['systolic_blood_pressure'],
            'diastolic_blood_pressure' => $data['diastolic_blood_pressure'],
            'respiratory_frequency' => $data['respiratory_frequency'],
        ]);

        return response()->json($attendance);
    }
}
