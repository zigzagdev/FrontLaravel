<?php

namespace App\Http\Requests\Api;

class UpdateNameRequest extends CommonRequest
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
            "name" => "required|min:4||max:100|string",
            "admin_id" => "required"
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return [
            "name.required" => $message['required'],
            "name.min" => sprintf($message['min'], 4),
            "name.max" => sprintf($message['max'], 100),
            "name.regex" => $message['regex'],
            "admin_id.required" => $message['required'],
        ];
    }
}
