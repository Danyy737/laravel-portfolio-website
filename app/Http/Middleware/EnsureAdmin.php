<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        // Not logged in → go login
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();

        // Admin rule: your email OR is_admin flag
        $isAdmin = $user->email === 'mouradany2004@gmail.com' || (bool) $user->is_admin;

        abort_unless($isAdmin, 403);

        return $next($request);

        
    }
}
