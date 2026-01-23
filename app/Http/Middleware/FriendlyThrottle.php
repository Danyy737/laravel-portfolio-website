<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

class FriendlyThrottle extends ThrottleRequests
{
    public function handle($request, Closure $next, $maxAttempts = 60, $decayMinutes = 1, $prefix = '')
    {
        try {
            return parent::handle($request, $next, $maxAttempts, $decayMinutes, $prefix);
        } catch (TooManyRequestsHttpException $e) {
            if ($request->routeIs('contact.submit')) {
                return back()
                    ->withErrors([
                        'rate_limit' => 'Please wait 1 minute before sending another message.',
                    ])
                    ->withInput();
            }

            throw $e;
        }
    }
}
