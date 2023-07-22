<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\ResourceCollection;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class ItemCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'statusCode' => Response::HTTP_OK,
            'statusMessage' => 'OK',
            'commentList' => $this->collection->map(function ($changeItems) {
                return [
                    'itemName' => $changeItems['name'],
                    'content' => Str::limit($changeItems['description'], 15, '...'),
                    'price' => $changeItems['price'],
                    'categoryName' => $changeItems['categoryName']
                ];
            })
        ];
    }
}
