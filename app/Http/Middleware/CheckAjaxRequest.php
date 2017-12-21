<?php

namespace App\Http\Middleware;

use Closure;

class CheckAjaxRequest
{
  /**
  * Since the system is a SPA, any request that is not asynchronous must return
  * the same base view, and from there, recover the status of the application.
  *
  * This Middleware has to be registered as global.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \Closure  $next
  * @return mixed
  */
  public function handle($request, Closure $next)
  {
    if(!$request->ajax()) {
      return Response(view('index'));
    }
    return $next($request);
  }
}
