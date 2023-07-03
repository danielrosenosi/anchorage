<?php

use App\Http\Controllers\API\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});

Route::controller(PatientController::class)->group(function () {
    Route::group(['prefix' => '/patients'], function () {
        Route::get('/', 'show')->name('patients.show');
        Route::post('/', 'store')->name('patients.store');
        Route::put('/{patientId}', 'update')->name('patients.update');
        Route::delete('/{patientId}', 'destroy')->name('patients.destroy');
    });

    Route::get('/show-patient/{patientId}', 'showById')->name('patient.show-by-id');
});

//routes for attendance
Route::get('/attendances/{patientId}', [AttendanceController::class, 'show'])->name('attendance.show');
Route::post('/attendance/{patientId}', [AttendanceController::class, 'store'])->name('attendance.store');