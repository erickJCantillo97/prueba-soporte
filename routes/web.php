<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
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
// Route::post('/tasks', [TaskController::class, 'store']);
// Route::put('/tasks/{id}', [TaskController::class, 'update']);
// Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

Route::get('tasks', 'TaskController@index');
Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@update');
Route::delete('tasks/{task}', 'TaskController@destroy');
Route::put('completeTasks/{task}', 'TaskController@complete');

Route::get('users', 'UserController@index');
Route::post('users', 'UserController@store'); 

Route::get('/', function () {
    return view('tasks');
});
