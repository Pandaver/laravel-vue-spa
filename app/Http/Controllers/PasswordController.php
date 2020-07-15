<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update()
    {
        if (Hash::check(\request('oldPassword'),\request()->user()->password)) {
            \request()->user()->update(['password' => bcrypt(\request('newPassword'))]);
            return response()->json([
                'status' => true,
                'message' => 'Password Updated.',
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'Old Password Mismatch.',
        ],402);
    }
}
