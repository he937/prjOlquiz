<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Epapers extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'epapers';
    protected $dateFormat = 'U';
    const CREATED_AT = 'createtime',
        UPDATED_AT = 'modifytime',
        appid = 12,
        tableid = 4,
        tablename = '试卷表';
}
