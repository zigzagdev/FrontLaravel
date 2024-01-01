<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SearchCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'statusCode' => Response::HTTP_OK,
            'statusMessage' => 'OK',
            'itemInformation' => $this->collection->map(function ($items) {
                return [
                    'Id' => $items['itemId'],
                    'itemName' => $items['name'],
                    'content' => Str::limit($items['description'], 15, '...'),
                    'price' => $items['price'],
                    'categoryName' => $items['categoryName'],
                    'slug' => $items['slug']
                ];
            }),
        ];
    }
}
