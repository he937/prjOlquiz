<?php

namespace App\Http\Controllers\Paper;

use App\Http\Controllers\ModuleController;
use App\Models\Exam;
use Illuminate\Http\Request;

abstract class ModulePaperController extends ModuleController
{
    public function __construct(int $operationid, string $operationname)
    {
        parent::__construct(5, '试卷列表');
        $this->operationid = $operationid;
        $this->operationname = $operationname;
    }
}
