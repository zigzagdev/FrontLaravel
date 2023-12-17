@include('Common.user-header')

Thank you for using our application !

@yield('content')

If you don't have any  request a password
reset, let us know.

{{$formUrl}}

@include('Common.user-footer')
