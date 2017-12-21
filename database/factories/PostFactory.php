<?php

use Faker\Generator as Faker;
use Carbon\Carbon as Carbon;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Post::class, function (Faker $faker) {
    $title = $faker->unique()->name;
    return array(
      'author_id' => 1,
      'category_id' => rand(1,10),
      'title' => $title,
      'slug' => str_slug($title,'-'),
      'description' => $faker->realText($maxNbChars = 200),
      'content' => $faker->realText($maxNbChars = 10000),
      'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
      'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    );
});
