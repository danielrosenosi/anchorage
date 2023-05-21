<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'symptoms' => 'array|required',
            'temperature' => 'numeric|required',
            'systolic_blood_pressure' => 'numeric|required',
            'diastolic_blood_pressure' => 'numeric|required',
            'respiratory_frequency' => 'numeric|required',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'symptoms.array' => 'O valor deve ser um conjunto.',
            'symptoms.required' => 'O campo é obrigatório.',
            'temperature.numeric' => 'O valor deve ser um número.',
            'temperature.required' => 'O campo é obrigatório.',
            'systolic_blood_pressure.numeric' => 'O valor deve ser um número.',
            'systolic_blood_pressure.required' => 'O campo é obrigatório.',
            'diastolic_blood_pressure.numeric' => 'O valor deve ser um número.',
            'diastolic_blood_pressure.required' => 'O campo é obrigatório.',
            'respiratory_frequency.numeric' => 'O valor deve ser um número.',
            'respiratory_frequency.required' => 'O campo é obrigatório.',
        ];
    }
}