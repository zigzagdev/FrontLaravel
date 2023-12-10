<?php

namespace App\Mail\Api;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetSuccess extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($url)
    {
        $this->url = $url;
    }

    public function build()
    {
        return [
            $this->from(config('mail.from.address'))
                ->subject("Password Reset Success Mail")
                ->text("Api.PasswordResetSuccess")
                ->with([
                    'url' => $this->url,
                ])
        ];
    }
}
