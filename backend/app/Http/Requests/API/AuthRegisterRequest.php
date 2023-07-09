<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;

class AuthRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório!',
            'name.string' => 'O nome deve ser uma string!',
            'name.max' => 'O nome deve ter no máximo 255 caracteres!',
            'email.required' => 'O email é obrigatório!',
            'email.string' => 'O email deve ser uma string!',
            'email.email' => 'O email deve ser um email válido!',
            'email.max' => 'O email deve ter no máximo 255 caracteres!',
            'email.unique' => 'O email já está em uso!',
            'password.required' => 'A senha é obrigatória!',
            'password.string' => 'A senha deve ser uma string!',
            'password.min' => 'A senha deve ter no mínimo 6 caracteres!',
        ];
    }
}
