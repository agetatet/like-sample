<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// 一覧
Route::get('/', function () {
    return view('list');
});
// 詳細
Route::get('/{id}', function ($id) {
    return view('detail', compact('id'));
});
