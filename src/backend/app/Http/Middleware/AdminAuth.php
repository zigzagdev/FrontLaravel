<?php

namespace App\Http\Middleware;

use App\Consts\Api\Number;
use App\Consts\Common;
use App\Models\Api\Admin;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use App\Http\Resources\Api\ErrorResource;
use \Symfony\Component\HttpFoundation\Response;
use App\Http\Middleware\TrustProxies as Middleware;


class AdminAuth extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
//     * //     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $adminData = Admin::where('id', $request->admin_id)->first();
        if (empty($adminData)) {
            $request->merge(['statusMessage' => sprintf(Common::FETCH_FAILED, '管理者データ')]);
            return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
        }
        if ($adminData->updated_at->addDays(Number::Two_Days) < Carbon::today()) {
            $request->merge(['statusMessage' => sprintf(Common::SESSION_FAILED, '管理者')]);
            return new ErrorResource($request, Response::HTTP_UNAUTHORIZED);
        }
        $adminData->update(['updated_at' => Carbon::now()]);

        return $next($request);
    }
}
