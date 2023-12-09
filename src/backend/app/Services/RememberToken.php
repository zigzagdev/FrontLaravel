<?php
namespace App\Services;


use App\Consts\Api\Number;
use App\Models\Api\UserRememberToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class RememberToken
{
    public static function generateRememberToken ($sendEmail)
    {
        $rememberToken = Str::random(20);

        $rememberUserData = UserRememberToken::where('email', $sendEmail->email)->first();
        if (!empty($rememberUserData)) {
            $rememberUserData->delete();
        }
        var_dump($sendEmail->email);
        $rememberUserData = UserRememberToken::create(
            [
                'remember_token' => $rememberToken,
                'expire_at' => Carbon::now()->addHour(Number::One_Hour),
                'email' => $sendEmail->email
            ],
        );
        return $rememberUserData;
    }
}
