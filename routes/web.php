<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\KuponController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('/users')->group(function(){
        Route::get('', [UserController::class, 'getAll'])->name('users.all');
        Route::get('/create', [UserController::class, 'create'])->name('users.create');
        Route::post('', [UserController::class, 'store'])->name('users.store');
        Route::put('/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{id}', [UserController::class, 'delete'])->name('users.delete');
        Route::get('/{id}', [UserController::class, 'edit'])->name('users.edit');
    });

    Route::prefix('/kupon')->group(function (){
        Route::get('', [KuponController::class, 'getAll'])->name('kupon.all');
        Route::get('/create', [KuponController::class, 'create'])->name('kupon.create');
        Route::get('/detail/{id}', [KuponController::class, 'getSingle'])->name('kupon.detail');
        Route::post('', [KuponController::class, 'store'])->name('kupon.store');
        Route::delete("/{id}", [KuponController::class, 'delete'])->name('kupon.delete');
        Route::get('/scan', [KuponController::class, 'scan'])->name('kupon.scan');
        Route::put('/scan/{kode}', [KuponController::class, 'claim'])->name('kupon.claim');
        Route::get('/{id}', [KuponController::class, 'edit'])->name('kupon.edit');
        Route::put('/{id}', [KuponController::class, 'update'])->name('kupon.update');
    });
});

require __DIR__.'/auth.php';
