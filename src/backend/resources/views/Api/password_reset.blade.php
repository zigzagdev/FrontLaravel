@extends('Common.user-template')
@section('content')
    Please click the below URL to reset your password.
    This URL is valid in 1 hour.


    {!! htmlspecialchars_decode($changeUrl) !!}
@endsection
