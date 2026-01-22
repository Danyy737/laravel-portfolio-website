<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $validated;

    public function __construct($validated)
    {
        $this->validated = $validated;
    }

 public function build()
{
    return $this
        ->subject('New Contact Form Message')
        ->view('emails.contact');
}

}