<?php

namespace App\Http\Requests\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UpdateEmailRequest extends CommonRequest
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
    public function rules(Request $request)
    {
        return [
//            "email" => "required|min:4|max:100|email:strict|unique:admins|unique:users"
            "email"     => [
                "required",
                "min:4",
                "max:100",
                "email:strict",
                Rule::unique('users')->ignore($request->route('id'), 'id'),
                Rule::unique('admins')->ignore($request->route('id'), 'id'),
    ],
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return [
            "email.required" => $message['required'],
            "email.min" => sprintf($message['min'], 4),
            "email.max" => sprintf($message['max'], 255),
            "email.strict" => $message['strict'],
            "email.unique" => $message['unique']
        ];
    }
}
