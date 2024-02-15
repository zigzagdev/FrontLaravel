<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

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
            'statusCode' => 200,
            'statusMessage' => 'OK',
            'itemInformation' => [
                'itemName' => $this[0]['name'],
                'content' => Str::limit($this[0]['description'], 15, '...'),
                'price' => number_format($this[0]['price']),
                'slug' => $this[0]['name'],
                'category' => $this[0]['categoryName'],
            ]
        ];
    }
}
