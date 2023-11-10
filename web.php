<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\getGroupController;
use App\Http\Controllers\allExamController;
use App\Http\Controllers\AnswerNow\TreeRecentExamsController;
use App\Http\Controllers\assistController;
use App\Http\Controllers\ExamControlController;

use App\Http\Controllers\KnowpointList\TreeKnowpointsController;
use App\Http\Controllers\KnowpointList\TreeItemsListController;
use App\Http\Controllers\KnowpointList\TreeKeywordsListController;

use App\Http\Controllers\ExamPreparing\TreegridExamPreparingController;
use App\Http\Controllers\ExamPreparing\InsertExamController;
use App\Http\Controllers\ExamPreparing\DeleteExamController;
use App\Http\Controllers\ExamPreparing\EditExamController;
use App\Http\Controllers\ExamPreparing\GridItemController;
use App\Http\Controllers\ExamPreparing\InsertItemController;
use App\Http\Controllers\ExamPreparing\DeleteItemController;
use App\Http\Controllers\ExamPreparing\EditItemController;
use App\Http\Controllers\ExamPreparing\GridOptionController;
use App\Http\Controllers\ExamPreparing\InsertOptionController;
use App\Http\Controllers\ExamPreparing\DeleteOptionController;
use App\Http\Controllers\ExamPreparing\EditOptionController;

use App\Http\Controllers\AnswerNow\GetRoleController;
use App\Http\Controllers\AnswerNow\GetExamInfoController;
use App\Http\Controllers\AnswerNow\GetItemInfoController;
use App\Http\Controllers\AnswerNow\EditItemTimeController;
use App\Http\Controllers\AnswerNow\InsertItemResultController;
use App\Http\Controllers\AnswerNow\InsertItemResultConsoleController;
use App\Http\Controllers\AnswerNow\ApplyItemResultController;
use App\Http\Controllers\AnswerNow\EndExamTimeController;
use App\Http\Controllers\StatisticsManager\gridMyscoreController;
use App\Http\Controllers\StatisticsManager\ChartSystemController;
use App\Http\Controllers\StatisticsManager\ChartItemResultController;
use App\Http\Controllers\StatisticsManager\ChartExamResultController;
use App\Http\Controllers\ClientAuth\LoginController as ClientAuthLoginController;
use App\Http\Controllers\ClientAuth\LogoutController as ClientAuthLogoutController;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Paper\PaperListController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');
})->middleware('logincheck');

Route::get('/answer', function () {
    return view('answer');
});

Route::middleware('logincheck')->prefix('Paper')->group(function () {
    Route::prefix('PaperList')->group(function () {
        Route::get('action', [PaperListController::class, 'action']);
    });
});

Route::middleware('logincheck')->prefix('KnowpointList')->group(function () {
    Route::prefix('TreeKnowpoints')->group(function () {
        Route::get('action', [TreeKnowpointsController::class, 'action']);
    });
    Route::prefix('TreeItemsList')->group(function () {
        Route::get('action', [TreeItemsListController::class, 'action']);
    });
    Route::prefix('TreeKeywordsList')->group(function () {
        Route::get('action', [TreeKeywordsListController::class, 'action']);
    });
    
});

Route::middleware('logincheck')->prefix('AnswerNow')->group(function () {
    Route::prefix('TreeRecentExams')->group(function () {
        Route::get('action', [TreeRecentExamsController::class, 'action']);
    });
    Route::prefix('GetExamInfo')->group(function () {
        Route::post('action', [GetExamInfoController::class, 'action']);
    });
    Route::prefix('GetItemInfo')->group(function () {
        Route::post('action', [GetItemInfoController::class, 'action']);
        Route::post('can', [GetItemInfoController::class, 'can']);
    });
    Route::prefix('GetRole')->group(function () {
        Route::post('action', [GetRoleController::class, 'action']);
    });
    Route::prefix('EditItemTime')->group(function () {
        Route::post('action', [EditItemTimeController::class, 'action']);
    });
    Route::prefix('EndExamTime')->group(function () {
        Route::post('action', [EndExamTimeController::class, 'action']);
    });
    Route::prefix('InsertItemResult')->group(function () {
        Route::post('action', [InsertItemResultController::class, 'action']);
    });

    Route::prefix('InsertItemResultConsole')->group(function () {
        Route::post('action', [InsertItemResultConsoleController::class, 'action']);
        Route::post('can', [InsertItemResultConsoleController::class, 'can']);
        Route::post('form', [InsertItemResultConsoleController::class, 'form']);
    });

    Route::prefix('ApplyItemResult')->group(function () {
        Route::post('action', [ApplyItemResultController::class, 'action']);
        Route::post('form', [ApplyItemResultController::class, 'form']);
    });
});

Route::middleware('logincheck')->prefix('ExamPreparing')->group(function () {
    //Exam
    Route::prefix('TreegridExamPreparingController')->group(function () {
        Route::post('action', [TreegridExamPreparingController::class, 'action']);
    });
    Route::prefix('InsertExamController')->group(function () {
        Route::post('action', [InsertExamController::class, 'action']);
        Route::post('form', [InsertExamController::class, 'form']);
        Route::post('can', [InsertExamController::class, 'can']);
    });
    Route::prefix('DeleteExamController')->group(function () {
        Route::post('action', [DeleteExamController::class, 'action']);
        Route::post('can', [DeleteExamController::class, 'can']);
    });
    Route::prefix('EditExamController')->group(function () {
        Route::post('action', [EditExamController::class, 'action']);
        Route::post('can', [EditExamController::class, 'can']);
        Route::post('form', [EditExamController::class, 'form']);
    });
    //Item
    Route::prefix('GridItemController')->group(function () {
        Route::post('action', [GridItemController::class, 'action']);
        Route::post('can', [GridItemController::class, 'can']);
    });
    Route::prefix('InsertItemController')->group(function () {
        Route::post('action', [InsertItemController::class, 'action']);
        Route::post('form', [InsertItemController::class, 'form']);
        Route::post('can', [InsertItemController::class, 'can']);
    });
    Route::prefix('DeleteItemController')->group(function () {
        Route::post('action', [DeleteItemController::class, 'action']);
        Route::post('can', [DeleteItemController::class, 'can']);
    });
    Route::prefix('EditItemController')->group(function () {
        Route::post('action', [EditItemController::class, 'action']);
        Route::post('can', [EditItemController::class, 'can']);
        Route::post('form', [EditItemController::class, 'form']);
    });
    //Option
    Route::prefix('GridOptionController')->group(function () {
        Route::post('action', [GridOptionController::class, 'action']);
        Route::post('can', [GridOptionController::class, 'can']);
    });
    Route::prefix('InsertOptionController')->group(function () {
        Route::post('action', [InsertOptionController::class, 'action']);
        Route::post('can', [InsertOptionController::class, 'can']);
    });
    Route::prefix('DeleteOptionController')->group(function () {
        Route::post('action', [DeleteOptionController::class, 'action']);
        Route::post('can', [DeleteOptionController::class, 'can']);
    });
    Route::prefix('EditOptionController')->group(function () {
        Route::post('action', [EditOptionController::class, 'action']);
        Route::post('can', [EditOptionController::class, 'can']);
        Route::post('form', [EditOptionController::class, 'form']);
    });
});

Route::middleware('logincheck')->prefix('StatisticsManager')->group(function () {
    Route::prefix('ChartItemResult')->group(function () {
        Route::post('action', [ChartItemResultController::class, 'action']);
    });
    Route::prefix('ChartExamResult')->group(function () {
        Route::post('action', [ChartExamResultController::class, 'action']);
    });
    Route::prefix('ChartSystem')->group(function () {
        Route::get('action', [ChartSystemController::class, 'action']);
    });
    Route::prefix('gridMyscore')->group(function () {
        Route::get('action', [gridMyscoreController::class, 'action']);
    });
});

/**
 * 用户认证登录
 *  */
Route::get('/xauth', function () {
    if (!env('APP_DEBUG')) {
        return redirect(env('MIX_SERVER_URL'));
    }
    return redirect('/');
});
Route::prefix('secret')->group(function () {
    Route::get('login/{jwt}', [ClientAuthLoginController::class, 'action']);
    Route::get('logout/{jwt}', [ClientAuthLogoutController::class, 'action']);
});

Route::get('mypath', function () {})->middleware('logincheck');

Route::get('/users/getinfo', function () {
    return response([
        'msgid' => Auth::check() ? 200 : 201,
        'msg' => Auth::check() ? '获取用户信息成功！' : '获取用户信息失败！',
        'errs' => [],
        'data' => [
            'realname' => Auth::check() ? Auth::user()->realname : '未登录',
            'name' => Auth::check() ? Auth::user()->name : '',
            'tagzhname' => Auth::check() ? Auth::user()->tagzhname : '',
            'url' => env('APP_DEBUG') ? '' : env('MIX_SERVER_URL'),
        ],
    ]);
});