@include('Common.user-header')

Thank you for using our application !

@yield('content')

If you ignore this message, your password will
not be changed. If you did't request a password
reset, let us know.

{{$formUrl}}

@include('Common.user-footer')
