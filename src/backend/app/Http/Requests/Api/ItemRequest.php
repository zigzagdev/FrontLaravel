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
            "itemName" => "required|min:5||max:100|string",
            "description" => "required|min:4|max:100|string",
            "price" => "required|integer",
            "category" => "required|integer",
            "click_count" => "required|integer",
        ];
    }

    public function messages()
    {
        $message = $this->errorMessages();
        return  [
            //itemName
            "itemName.required" => $message['required'],
            "itemName.min" => sprintf($message['min'], 4),
            "itemName.max" => sprintf($message['min'], 100),
            "itemName.string" => $message['string'],

            //description
            "description.required" => $message['required'],
            "description.min" => sprintf($message['min'], 8),
            "description.max" => sprintf($message['max'], 255),

            //price
            "price.required" => $message['required'],
            "price.integer" => $message['integer'],

            //category
            "category.required" => $message['required'],
            "category.integer" => $message['integer'],

            //click_count
            "click_count.required" => $message['required'],
            "click_count.integer" => $message['integer'],
        ];
    }
}
