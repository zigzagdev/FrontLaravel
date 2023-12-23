@extends('Common.user-template')
@section('content')

    Your password was updated successfully !
    Please log in app with this below URL


    {{$loginUrl}}

    If you ignore this message, your password will
    not be changed.

@endsection
