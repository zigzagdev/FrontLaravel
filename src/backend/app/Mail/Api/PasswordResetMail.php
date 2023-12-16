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
    public function __construct($changeUrl, $formUrl)
    {
        $this->changeUrl = $changeUrl;
        $this->formUrl = $formUrl;
    }

    public function build()
    {
        return [
            $this->from(config('mail.from.address'))
                ->subject("Password Reset Mail")
                ->text("Api.password_reset")
                ->with([
                    'changeUrl' => $this->changeUrl,
                    'formUrl' => $this->formUrl
                ])
        ];
    }

}
