<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthTokenController extends Controller
{
    public function store(Request $request)
    {
        // 1) Validate input
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['sometimes', 'string', 'max:255'], // optional, just a label
        ]);

        // 2) Find user by email
        $user = User::where('email', $request->email)->first();

        // 3) Check password
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        // 4) Admin rule (match your existing EnsureAdmin logic)
        $isAllowedEmail = $user->email === 'mouradany2004@gmail.com';
        $isAdminFlag = (int) ($user->is_admin ?? 0) === 1;

        if (! $isAllowedEmail && ! $isAdminFlag) {
            return response()->json([
                'message' => 'Forbidden (admin only).',
            ], 403);
        }

        // 5) Create token
        $deviceName = $request->input('device_name', 'postman');
        $token = $user->createToken($deviceName, ['admin'])->plainTextToken;

        return response()->json([
            'token_type' => 'Bearer',
            'access_token' => $token,
        ], 200);
    }

    public function destroy(Request $request)
    {
        // Deletes the token used for THIS request
        $request->user()->currentAccessToken()->delete();

        return response()->noContent(); // 204
    }
}
