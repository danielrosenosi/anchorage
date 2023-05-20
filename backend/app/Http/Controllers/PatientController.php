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

        return response()->json($patient);
    }

    public function update(int $id, UpdatePatientRequest $request)
    {
        $data = $request->validated();

        $patient = PatientModel::findOrFail($id);

        $patient->update($data);

        return response()->json($patient);
    }

    public function destroy(int $id)
    {
        $patient = PatientModel::findOrFail($id);

        $patient->delete();

        return response()->json(['message' => 'Paciente removido com sucesso!']);
    }
}
