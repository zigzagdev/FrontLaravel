<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class FetchItemResource extends JsonResource
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
            'statusCode' => $this->statusCode,
            'statusMessage' => 'OK',
            'profile' => [
                'id' => $this->itemId,
                'itemName' => $this->name,
                'content' => $this->description,
                'price' => number_format($this->price),
                'slug' => $this->slug,
                'admin_id' => $this->adminId,
                'category' => $this->category
            ]
        ];
    }
}
