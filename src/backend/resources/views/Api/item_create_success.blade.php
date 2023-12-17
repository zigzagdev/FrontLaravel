@extends('Common.admin-template')
@section('content')
    Item was created successfully !
    Registered item data is below.

    [Item data]
    ■Item name     {{$name}}
    ■Item Price     {{$price}}
    ■Item Description

    ■Item Category     {{$category}}



@endsection
