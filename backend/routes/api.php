<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/patients', [PatientController::class, 'show'])->name('patients.show');
Route::get('/show-patient/{patientId}', [PatientController::class, 'showById'])->name('patient.show-by-id');
Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
Route::put('/patients/{patientId}', [PatientController::class, 'update'])->name('patients.update');
Route::delete('/patients/{patientId}', [PatientController::class, 'destroy'])->name('patients.destroy');

//routes for attendance
Route::get('/attendances/{patientId}', [AttendanceController::class, 'show'])->name('attendance.show');
Route::post('/attendance/{patientId}', [AttendanceController::class, 'store'])->name('attendance.store');