<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateUserAction;
use App\Http\Requests\UserRegistrationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

final class UsersController extends Controller
{
    public function store(UserRegistrationRequest $request, CreateUserAction $createUserAction)
    {
        $user = $createUserAction->handle(
            (string) $request->string('username'),
            (string) $request->string('email'),
            (string) $request->string('password'),
        );

        Auth::login($user);

        return Redirect::back();
    }
}
