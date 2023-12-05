<?php

namespace App\Http\Requests\Api;

class UserRequest extends CommonRequest
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
            "name" => "required|min:4|max:100|string",
            "email" => "required|max:100|email:strict|unique:admins|unique:users",
            "password" => "min:8|max:255|required",
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return [
            //name
            "name.required" => $message['required'],
            "name.min" => sprintf($message['min'], 4),
            "name.max" => sprintf($message['max'], 100),
            "name.regex" => $message['regex'],

            //password
            "password.required" => $message['required'],
            "password.min" => sprintf($message['min'], 8),
            "password.max" => sprintf($message['max'], 255),

            //email
            "email.required" => $message['required'],
            "email.min" => sprintf($message['min'], 4),
            "email.max" => sprintf($message['max'], 100),
            "email.email" => $message['email'],
            "email.unique" => $message['unique']
        ];
    }
}
