<?php

namespace App\Services;

use App\Models\Kupon;
use Illuminate\Support\Str;

class KodeGenerator
{
    public static function generateUniqueKode(): string
    {
        $kode = Str::random(4);
        while (Kupon::where('kode', $kode)->exists()) {
            $kode = Str::random(4);
        }
        return $kode;
    }
}
