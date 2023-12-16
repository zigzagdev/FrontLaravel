<?php

namespace App\Mail\Api;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($formUrl, $loginUrl)
    {
        $this->formUrl = $formUrl;
        $this->loginUrl = $loginUrl;
    }

    public function build()
    {
        return [
            $this->from(config('mail.from.address'))
                ->subject("Password Reset Success Mail")
                ->text("Api.password_reset_success")
                ->with([
                    'formUrl' => $this->formUrl,
                    'loginUrl' => $this->loginUrl
                ])
        ];
    }
}
