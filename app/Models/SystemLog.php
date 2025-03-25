<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemLog extends Model
{
    /** @use HasFactory<\Database\Factories\SystemLogFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'message',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

