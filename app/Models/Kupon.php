<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode',
        'is_claim',
        'expired_at',
        'name',
        'desc',
    ];

    protected $casts = [
        'is_claim' => 'boolean',
        'expired_at' => 'datetime',
    ];
}