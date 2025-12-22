<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Domain\Game\Concepts\GameModes;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use ValueError;

final class GameModeRoundIntegrity
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $modeParam = $request->route('gameMode');
        $roundParam = $request->route('round') ?? 1;

        // Validate mode
        try {
            $mode = is_string($modeParam) ? GameModes::from($modeParam) : $modeParam;
        } catch (ValueError) {
            $this->fail();

        }

        // Validate round
        if (! is_numeric($roundParam)) {
            $this->fail();

        }

        $round = (int) $roundParam;

        if (! $mode->isValidRound($round)) {
            $this->fail();
        }

        return $next($request);
    }

    private function fail(): never
    {
        abort(404, 'Invalid game mode or round');
    }
}
