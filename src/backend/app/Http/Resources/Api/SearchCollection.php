<?php

namespace App\Http\Resources\Api;

use App\Consts\Api\Category;
use App\Models\Api\Item;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SearchCollection extends ResourceCollection
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
            'userInformation' => $this->collection->map(function ($items) {
                return [
                    'id' => $items->id,
                    'itemName' => $items->name,
                    'content' => Str::limit($items->description, 15, '...'),
                    'price' => $items->price,
                    'category' => $items->category
                ];
            })
        ];
    }
}
