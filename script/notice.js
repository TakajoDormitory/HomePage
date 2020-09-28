$.getJSON('json/notice.json')
    .done(function (data) {
        $.each(data,function(value){
            $("#notice .list").append('<li><dl><dt>'+value.date+'</dt><dd>'+value.title+'</dd></dl></li>');
        });
});