<?php

namespace App\Http\Middleware;

use App\Consts\Api\Number;
use App\Consts\Common;
use App\Http\Resources\Api\ErrorResource;
use App\Models\Api\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Middleware\TrustProxies as Middleware;

class UserAuth extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
//     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $userData = User::where('id', $request->user_id)->first();
        if (empty($userData)) {
            $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, 'ユーザー')]);
            return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
        }
        if ($userData->updated_at->addDays(Number::Two_Days) < Carbon::today()) {
            $request->merge(['statusMessage' => sprintf(Common::LOGIN_FAILED, 'ユーザー')]);
            return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
        }
        $userData->update(['updated_at' => Carbon::now()]);
        return $next($request);
    }
}
