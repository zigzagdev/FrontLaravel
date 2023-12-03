<?php

namespace App\Mail\Api;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    public function build()
    {
        return [
            $this->from(config('mail.from.address'))
                ->subject('記事の更新が完了致しました。')
                ->text('mail.Api.Password reset mail.')
                ->with([
                    'name' => $this->nickName,
                    'title' => $this->title,
                    'content' => $this->content,
                    'prefecture' => $this->prefecture
                ])
        ];
    }

}
