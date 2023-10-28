<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceResponse;

class ErrorResource extends JsonResource
{

    public $statusCode;

    public function __construct($request, $statusCode = 401)
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
            'statusMessage' => $this->Response
        ];
    }

    public function toResponse($request)
    {
        return (new ResourceResponse($this))->toResponse($request)->setStatusCode($this->statusCode);
    }
}
