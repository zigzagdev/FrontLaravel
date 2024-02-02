<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class UpdateAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function __construct($resource)
    {
        parent::__construct($resource);
    }


    public function toArray($request)
    {
        return [
            'statusCode' => 200,
            'statusMessage' => 'OK',
            'profile' => [
                'name' => $this->name,
            ]
        ];
    }
}
