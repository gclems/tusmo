<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\User;

final readonly class CreateUserAction
{
    /**
     * Execute the action.
     */
    public function handle(string $username, string $email, string $password): User
    {
        return User::create([
            'username' => $username,
            'email' => $email,
            'password' => bcrypt($password),
        ]);
    }
}
