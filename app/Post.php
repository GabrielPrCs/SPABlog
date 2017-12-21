<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
  /**
   * Gets the category that owns the post.
   */
  public function category()
  {
    return $this->belongsTo('App\Category');
  }

  /**
   * Gets the author of this post.
   */
  public function author()
  {
    return $this->belongsTo('App\User', 'author_id');
  }

  /**
   * Creates an object to be used on the React Components.
   */
  public function toReactObject() {
    $post = new Post();
    $post->id = $this->id;
    $post->author = $this->author->toReactObject();
    $post->title = $this->title;
    $post->slug = $this->slug;
    $post->description = $this->description;
    $post->content = $this->content;
    $post->updated_at = $this->updated_at;
    $post->category = $this->category->toReactObject();
    return $post;
  }
}
