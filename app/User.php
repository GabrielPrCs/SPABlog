<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
  use Notifiable;

  /**
  * Gets the posts that this user has created.
  */
  public function posts()
  {
    return $this->hasMany('App\Post', 'author_id', 'id');
  }

  /**
   * Creates an object to be used on the React Components.
   */
  public function toReactObject()
  {
    $user = new User();
    $user->name = $this->name;
    $user->email = $this->email;
    $user->created_at = $this->created_at;
    return $user;
  }

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
    'name', 'email', 'password',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
    'password', 'remember_token',
  ];
}
