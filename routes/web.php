<?php

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

Route::get('/', function () { return view('index'); })->name('index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/posts/{slug}/show', 'PostsController@show')->name('posts.show')->middleware('auth');;
Route::resource('posts', 'PostsController', ['except' => ['create','edit','show']])->middleware('auth');

Route::get('/categories/{slug}/show', 'CategoriesController@show')->name('categories.show')->middleware('auth');;
Route::resource('categories', 'CategoriesController', ['except' => ['create','edit','show']])->middleware('auth');;

Route::get('/profiles/{email}/show', function($email) {
  $user = \App\User::where('email','=',$email)->first();
  $posts = $user->posts;
  $posts->transform(function ($post) {
    return $post->toReactObject();
  });
  $profile = new stdClass();
  $profile->user = $user->toReactObject();
  $profile->posts = $posts;
  return collect($profile);
});

Route::get('/currentuser', function() {
  if(Auth::guest()) {
    return "null";
  }
  return Auth::user()->toReactObject();
});
