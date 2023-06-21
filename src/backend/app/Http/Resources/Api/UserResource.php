<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function __construct($resource, $statusCode = 201)
    {
        parent::__construct($resource);
        $this->statusCode = $statusCode;
    }

    public function toArray($request)
    {
        return [
            'statusCode' => $this->statusCode,
            'statusMessage' => 'OK',
        ];
    }
}
