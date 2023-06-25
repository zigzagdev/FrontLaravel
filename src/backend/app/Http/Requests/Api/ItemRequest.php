<?php

namespace App\Http\Requests\Api;

class ItemRequest extends CommonRequest
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
            "name" => "required|min:5||max:100|string",
            "description" => "required|min:4|max:100|string",
            "price" => "required",
            "category" => "required",
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return  [
            //name
            "name.required" => $message['required'],
            "name.min" => sprintf($message['min'], 4),
            "name.max" => sprintf($message['min'], 100),
            "name.string" => $message['string'],

            //description
            "description.required" => $message['required'],
            "description.min" => sprintf($message['min'], 8),
            "description.max" => sprintf($message['max'], 255),

            //price
            "price.required" => $message['required'],

            //category
            "category.required" => $message['required'],
        ];
    }
}
