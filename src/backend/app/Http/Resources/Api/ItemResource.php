<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ItemResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'statusCode' => 200,
            'statusMessage' => 'OK',
            'itemInformation' => [
                'itemName' => $this->name,
                'content' => Str::limit($this->description, 15, '...'),
                'price' => number_format($this->price),
                'slug' => $this->name,
                'category' => $this->categoryName,
            ]
        ];
    }
}
