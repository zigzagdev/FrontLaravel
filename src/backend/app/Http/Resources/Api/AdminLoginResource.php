<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminLoginResource extends JsonResource
{

    public function __construct($resource)
    {
        parent::__construct($resource);
    }
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'statusCode' => '200',
            'statusMessage' => 'OK',
            'token' => $this->token,
        ];
    }
}
