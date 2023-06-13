<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShowPatientsRequest;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\PatientModel;

class PatientController extends Controller
{
    public function show(ShowPatientsRequest $request)
    {
        $patients = PatientModel::with('lastAttendance')
            ->when($request->has('search'), function ($query) use ($request) {
                $query->where('fullname', 'LIKE', "%{$request->search}%")
                    ->orWhere('cpf', 'LIKE', "%{$request->search}%");
            })->paginate(10);

        return response()->json($patients);
    }

    public function showById(int $patientId)
    {
        $patient = PatientModel::findOrFail($patientId);
        $patient->load('allAttendances');

        return response()->json($patient);
    }

    public function store(StorePatientRequest $request)
    {
        $data = $request->validated();

        $file = $data['image'];
        $path = $file->store('patients');
        $data['image'] = $path;

        $patient = PatientModel::firstOrCreate($data);

        return response()->json($patient);
    }

    public function update(int $patientId, UpdatePatientRequest $request)
    {
        $data = $request->validated();

        $patient = PatientModel::findOrFail($patientId);
        $patient->update($data);

        return response()->json($patient);
    }

    public function destroy(int $patientId)
    {
        $patient = PatientModel::findOrFail($patientId);
        $attendances = $patient->allAttendances();

        $attendances->delete();
        $patient->delete();

        return response()->json(['message' => 'Paciente deletado com sucesso!']);
    }
}
