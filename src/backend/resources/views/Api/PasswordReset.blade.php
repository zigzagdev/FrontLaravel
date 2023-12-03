@include('mail.Common.Header')
@section('Content')
    Thank you for using our app.
    This mail is sent for resetting your password .

    Please access to below url and
    reset your password in 60 minutes  .

    Otherwise, this URL will be useless .

    {{$url}}}

@endsection
@include('mail.Common.Footer')
