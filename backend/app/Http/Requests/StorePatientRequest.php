<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'fullname' => 'required|string|min:5|max:255',
            'birthdate' => 'required|date',
            'cpf' => 'required|string|unique:patients,cpf',
            'phone' => 'required|string',
            'image' => 'required|mimes:jpeg,png,jpg',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'fullname.required' => 'O campo nome é obrigatório',
            'fullname.string' => 'O campo nome deve ser uma string',
            'birthdate.required' => 'O campo data de nascimento é obrigatório',
            'birthdate.date' => 'O campo data de nascimento deve ser uma data',
            'cpf.required' => 'O campo CPF é obrigatório',
            'cpf.string' => 'O campo CPF deve ser uma string',
            'cpf.unique' => 'O CPF informado já está cadastrado',
            'phone.required' => 'O campo telefone é obrigatório',
            'phone.string' => 'O campo telefone deve ser uma string',
            'image.required' => 'O campo imagem é obrigatório',
            'image.mimes' => 'O campo imagem deve ser um arquivo do tipo: jpeg, png, jpg',
        ];
    }
}
