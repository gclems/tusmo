<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = [
        'content',
        'normalized',
        'length',
    ];

    public $timestamps = false;
}
