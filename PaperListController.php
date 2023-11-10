<?php

namespace App\Http\Controllers\Paper;

use App\Models\Epapers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

//use Illuminate\Support\Facades\Response;

class PaperListController extends ModulePaperController
{
    public function __construct()
    {
        parent::__construct(501, '获取试卷列表');
    }

    public function getPaperList($parentID = null)
    {
        $papers = Epapers::select([
            'id',
            'name',
        ]);
    
        $papers = $papers->get();
    
        $papersList = [];
    
        foreach ($papers as $paper) {
            $papersList[] = $paper->name;
        }
    
        return $papersList;
    }
    
    public function action(Request $req): Response
    {
        /* // 获取知识点树的根节点
        $knowledgePointTree = $this->getKnowledgePointTree();
        
        Log::info('获取知识点树数据:', ['knowledge_points' => $knowledgePointTree]);
        if (!empty($knowledgePointTree)) {
            return $this->respond_process(
                200,
                '获得知识点树成功',
                'success',
                $knowledgePointTree
            );
        } else {
            return response('知识点树为空！', 201);
        } */
        // 获取试卷列表
    $paperList = $this->getPaperList();
    // 记录数据
    Log::info('获取试卷列表数据:', ['paper_lists' => $paperList]);
    if (!empty($paperList)) {
        return $this->respond_process(
            200,
            '获得试卷列表成功',
            'success',
            $paperList
        );
    } else {
        return response('试卷列表为空！', 201);
    }
    }    
}
