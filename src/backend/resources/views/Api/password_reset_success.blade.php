@extends('Common.user-template')
@section('content')
    Your password was updated successfully !
    Please log in app with this below URL


    {{$loginUrl}}
@endsection
