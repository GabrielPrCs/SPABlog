<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  /**
  * Gets the posts for the category.
  */
  public function posts()
  {
    return $this->hasMany('App\Post');
  }

  /**
   * Creates an object to be used on the React Components.
   */
  public function toReactObject()
  {
    $category = new Category();
    $category->name = $this->name;
    $category->slug = $this->slug;
    $category->description = $this->description;
    $category->posts_count = $this->posts()->count();
    return $category;
  }
}
