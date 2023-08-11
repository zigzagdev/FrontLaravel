<?php

namespace App\Http\Requests\Api;


class LoginRequest extends CommonRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "email" => "required|email|string",
            "password" => "required|string",
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return [
            //email
            "email.required" => $message['required'],
            "email.email" => $message['email'],
            "email.string" => $message['string'],
            //password
            "password.required" => $message['required'],
            "password.string" => $message['string'],
        ];
    }
}
