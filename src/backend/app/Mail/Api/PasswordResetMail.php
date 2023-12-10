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
    public function __construct($url, $formUrl)
    {
        $this->url = $url;
        $this->formUrl = $formUrl;
    }

    public function build()
    {
        return [
            $this->from(config('mail.from.address'))
                ->subject("Password Reset Mail")
                ->text("Api.PasswordReset")
                ->with([
                    'url' => $this->url,
                    'formUrl' => $this->formUrl
                ])
        ];
    }

}
