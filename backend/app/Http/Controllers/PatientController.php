<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\PatientModel;

class PatientController extends Controller
{
    public function show()
    {
        $patients = PatientModel::with('attendances')->get();

        return response()->json($patients);
    }

    public function store(StorePatientRequest $request)
    {
        $data = $request->validated();

        $patient = PatientModel::firstOrCreate($data);

        $data['image']->store('images');

        return response()->json($patient);
    }

    public function update(int $patientId, UpdatePatientRequest $request)
    {
        $data = $request->validated();

        $patient = PatientModel::findOrFail($patientId);

        $patient->update($data);

        $data['image']->store('images');

        return response()->json($patient);
    }

    public function destroy(int $patientId)
    {
        $patient = PatientModel::findOrFail($patientId);

        $patient->delete();

        return response()->json(['message' => 'Paciente removido com sucesso!']);
    }
}
