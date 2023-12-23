<?php

namespace App\Http\Requests\Api;


class PasswordResetRequest extends CommonRequest
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
            "password" => "min:8|max:255|required",
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return [
            "password.min" => sprintf($message['min'], 8),
            "password.max" => sprintf($message['max'], 255),
            "password.required" => $message['required'],
        ];
    }

}
