<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegistrationRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function store(UserRegistrationRequest $request)
    {
        $user = User::create([
            'username' => $request->string('username'),
            'email' => $request->string('email'),
            'password' => bcrypt($request->string('password')),
        ]);

        Auth::login($user);

        return Redirect::back();
    }
}
