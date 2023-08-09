<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{

    public function __construct($request, $statusCode = 200)
    {
        parent::__construct($request);
        $this->statusCode = $statusCode;
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
            'expiration' => $this->expiration
        ];
    }
}
