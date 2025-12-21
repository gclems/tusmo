<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;

final class StatisticsController extends Controller
{
    public function index()
    {
        return Inertia::render('statistics/page');
    }
}
