<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttendanceRequest;
use App\Models\AttendanceModel;

class AttendanceController extends Controller
{
    public function show(int $patientId)
    {
        $attendance = AttendanceModel::where('patient_id', $patientId)->get();

        foreach ($attendance as $key => $value) {
            $attendance[$key]['status'] = AttendanceModel::getDescriptionStatus($value['status']);
        }

        return response()->json($attendance);
    }

    public function store(int $patientId, AttendanceRequest $request)
    {
        $data = $request->validated();

        $attendance = AttendanceModel::create([
            'patient_id' => $patientId,
            'symptoms' => $data['symptoms'] ?? [],
            'status' => AttendanceModel::getStatus($data['symptoms'] ?? []),
        ]);

        return response()->json($attendance);
    }
}
