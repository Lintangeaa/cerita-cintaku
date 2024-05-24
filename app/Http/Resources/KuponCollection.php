<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class KuponCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($kupon) {
            return [
                'id' => $kupon->id,
                'kode' => $kupon->kode,
                'expired_at' => $kupon->expired_at,
                'name' => $kupon->name,
                'desc' => $kupon->desc,
                'is_claim' => $kupon->is_claim
            ];
        });
    }
}