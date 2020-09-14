<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/png" href="{{$app_logo}}"/>
    <link rel="stylesheet" href="{{asset('css/app.css')}}"/>
    <title>{{setting('app_name')}}</title>
</head>
<body>
    <div id="app"></div>
    <script src="{{asset('js/app.js')}}"></script>    
</body>
</html>