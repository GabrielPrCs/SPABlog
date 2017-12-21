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

$factory->define(App\Category::class, function (Faker $faker) {
    $name = $faker->unique()->name;
    return array(
      'name' => $name,
      'slug' => str_slug($name,'-'),
      'description' => $faker->realText($maxNbChars = 150),
      'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
      'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
    );
});
